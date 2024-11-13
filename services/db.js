const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sendVerificationEmail, verifyCode } = require('./modules/emailsender');
const { setCookie } = require("./modules/cookie")


const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'W2cLLJ07Dfiv4Q',
    database: 'mairen_db',
});

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function establishConnection() {
    try {
        await connection.promise().execute('SELECT 1');
        console.log('Connection established successfully');
    } catch (err) {
        console.error('Retrying after 2 seconds');
        setTimeout(establishConnection, 2000);
    }
}

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    res.header('Access-Control-Allow-Origin', '*');

    if (!email || !password) {
        return res.status(200).json({ message: '请输入邮箱和密码' });
    }

    try {
        const results = await queryAsync('SELECT * FROM user WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(200).json({ message: '邮箱或密码错误' }); // 返回错误
        }

        const hashedPassword = results[0]?.password;

        if (!hashedPassword) {
            return res.status(500).json({ message: '无法检索用户密码' });
        }

        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            res.status(200).json({ message: '登录成功' });
            setCookie("mai_security", `mai_${passwordMatch}`, 30) // set cookie called mai_security
         } else {
            res.status(200).json({ message: '账号或密码错误' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: '内部服务器错误' });
    }
});


let verificationCode; // 用于存储生成的验证码

app.post('/api/register', async (req, res) => {
    const { username, password, email, code } = req.body;
    res.header('Access-Control-Allow-Origin', '*');

    try {
        // 验证请求数据的完整性
        if (!username || !password || !email || !code) {
            return res.status(400).json({ message: '请输入用户名、密码、邮箱' }); // 返回错误
        }

        // 检查邮箱是否被使用
        const emailCheck = await queryAsync('SELECT * FROM user WHERE email = ?', [email]);
        if (emailCheck.length > 0) {
            return res.status(400).json({ message: '该邮箱已被注册，请使用其他邮箱' });
        }

        // 检查验证码是否正确
        const verified = await verifyCode(email, code);
        if (!verified) {
            return res.status(400).json({ message: '验证码不正确' });
        }

        // 哈希密码
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 将新用户信息存入数据库
        await queryAsync('INSERT INTO user (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);

        res.status(201).json({ message: '注册成功！' });
    } catch (error) {
        console.error('注册过程中出现错误:', error);
        res.status(500).json({ message: '内部服务器错误' });
    }
});

app.post("/api/request-verification", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: '请填入邮箱' }); // 返回错误
    }

    const emailCheck = await queryAsync('SELECT * FROM user WHERE email = ?', [email]);
    if (emailCheck.length > 0) {
        return res.status(400).json({ message: '该邮箱已被注册，请使用其他邮箱' });
    }

    try {
        // Generate and send verification code
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 生成六位数验证码
        await sendVerificationEmail(email, verificationCode); // 发送验证码时传递验证码
        res.status(200).json({ message: '验证码已发送到你的邮箱' });
    } catch (error) {
        console.error('发送验证码时出错:', error);
        res.status(500).json({ message: '发送邮件失败' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    establishConnection();
});

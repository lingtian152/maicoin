const nodemailer = require('nodemailer');
const crypto = require('crypto');

// 存储验证码的对象
const verificationCodes = {};

// 生成验证码
function generateVerificationCode() {
    const code = crypto.randomInt(10000, 100000); // 生成 6 位随机验证码
    return code.toString(); // 转换为字符串
}

// 发送验证码邮件
async function sendVerificationEmail(email) {
    const verificationCode = generateVerificationCode();

    // 保存验证码到内存中（以邮箱为键）
    verificationCodes[email] = verificationCode;

    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // 使用 STARTTLS
        auth: {
            user: 'admin@yu-zu.top', // 替换为你的邮箱
            pass: '9EbHhri0hx0NqH' // 替换为你的应用密码
        }
    });

    const mailOptions = {
        from: 'admin@yu-zu.top',
        to: email,
        subject: '麦币验证码',
        text: `欢迎注册麦币，你的注册码为：${verificationCode}，感谢你的支持`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('验证码发送成功:', verificationCode);
        return verificationCode; // 返回验证码，可以存储在数据库中
    } catch (error) {
        console.error('发送验证码时出错:', error);
        throw new Error('发送邮件失败'); // 抛出异常以便调用者处理
    }
}

// 验证验证码
function verifyCode(email, inputCode) {
    const storedCode = verificationCodes[email];
    if (storedCode && storedCode === inputCode) {
        delete verificationCodes[email]; // 验证后删除验证码
        return true; // 验证成功
    }
    return false; // 验证失败
}

module.exports = {
    sendVerificationEmail,
    verifyCode // 导出验证函数
};

import style from '../css/nav.module.css';

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <div className={style.nav_container}>
                <div>
                    <h2 className={style.nav_title}>麦币</h2>
                </div>
                <div className={style.tab_buttons}>
                    <ul className={style.nav_list}>
                        <li className={style.nav_item}>
                            <a>首页</a>
                        </li>
                        <li className={style.nav_item}>
                            <a>关于</a>
                        </li>
                    </ul>
                </div>
                <div className={style.auth_buttons}>
                    <ul className={style.nav_list}>
                        <li className={style.nav_item}>
                            <a className={style.login}>登录</a>
                        </li>
                        <li className={style.nav_item}>
                            <a>注册</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
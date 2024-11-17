import styles from '../css/hero.module.css';
import contentStyles from '../css/content.module.css';
import investorStyles from '../css/investor.module.css';
import Image from 'next/image';

export default function HomeView() {
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.hero_image}>
                    <h2 className={styles.hero_title}>欢迎来到麦币</h2>
                </div>
            </div>
            <div className={contentStyles.content_container}>
                <h2>什么是麦币？</h2>
                <p className={contentStyles.content_descript}>
                    麦币 (MaiCoin)
                    是由麦仁发布的一种去中心化虚拟货币，专为全球用户设计，以提供快速、安全、便捷的数字资产交易体验。麦币旨在打破传统金融系统的壁垒，为用户提供一个全新的金融生态系统，用户不仅可以在全球范围内进行安全的交易，还能享受到虚拟货币带来的诸多便利。
                </p>
                <div className={contentStyles.content_image} />
            </div>
            <div className={investorStyles.investor_container}>
                <h2>投资人</h2>
                <div className={investorStyles.investor_content}>
                    <div className={investorStyles.investor}>
                        <Image
                            width={150}
                            height={150}
                            src="/images/yuzu-head.png"
                            alt="yuzu"
                            className={investorStyles.investor_img}
                        />
                        <p className={investorStyles.investor_name}>yuzu</p>
                    </div>
                    <div className={investorStyles.investor}>
                        <Image
                            width={150}
                            height={150}
                            src="/images/mozi-head.png"
                            alt="mozi1924"
                            className={investorStyles.investor_img}
                        />
                        <p className={investorStyles.investor_name}>mozi1924</p>
                    </div>
                    <div className={investorStyles.investor}>
                        <Image
                            width={150}
                            height={150}
                            src="/images/mairen-head.png"
                            alt="mairen"
                            className={investorStyles.investor_img}
                        />
                        <p className={investorStyles.investor_name}>麦仁</p>
                    </div>
                </div>
            </div>
        </>
    );
}
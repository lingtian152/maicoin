import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import styles from "../css/HomeView.module.css";

export default function Home() {
    return (
        <div>
            {/* Hero section */}
            <section className={styles.hero}>
                <Typography variant="h1" component="h1" className={styles.heroTitle}>
                    欢迎来到麦币
                </Typography>
            </section>

            {/* Introduction Section */}
            <Container>
                <Grid container spacing={4}>
                    {/* Text on the left */}
                    <Grid item xs={12} md={6} className={styles.maiCoin}>
                        <Box className={styles.maiCoinDesc}>
                            <Typography variant="h4" className={styles.maiCoinTitle}>
                                什么是麦币？
                            </Typography>
                            <Typography variant="body1" className={styles.maiCoinContent}>
                                麦币 (MaiCoin) 是由麦仁发布的一种去中心化虚拟货币，专为全球用户设计，以提供快速、安全、便捷的数字资产交易体验。麦币旨在打破传统金融系统的壁垒，为用户提供一个全新的金融生态系统，用户不仅可以在全球范围内进行安全的交易，还能享受到虚拟货币带来的诸多便利。
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Image on the right */}
                    <Grid item xs={12} md={6}>
                        <Image
                            src="/images/maicoin_bg.png"
                            alt="MaiCoin Background"
                            width={500}
                            height={300}
                            className={styles.maiCoinImg}
                            priority
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* Investors Section */}
            <Container className={styles.bannerContainer}>
                <Typography variant="h2" align="center" className={styles.bannerTitle}>
                    投资人
                </Typography>
                <Grid container justifyContent="center" spacing={4} className={styles.banner}>
                    {/* Individual Investor */}
                    {["yuzu", "mozi", "mairen"].map((investor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} className={styles.investor}>
                            <Image
                                src={`/images/${investor}-head.png`}
                                alt={investor}
                                width={80}
                                height={80}
                                className={styles.investorImg}
                            />
                            <Box className={styles.investorInfo}>
                                <Typography variant="h5">{investor}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

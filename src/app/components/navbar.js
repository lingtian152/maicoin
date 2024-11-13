'use client';
import { useState } from "react";
import { Grid } from '@material-ui/core';
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, Container, Menu, MenuItem } from "@mui/material";
import Style from "../css/NavBar.module.css";


export default function HomeView() {
    const [activeTab] = useState("home");
    const [menuAnchor, setMenuAnchor] = useState(null);

    // Handle mobile menu click
    const handleMenuClick = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = (page) => {
        setMenuAnchor(null);
    };

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography className={Style.title} style={{ flexGrow: 1, fontWeight: "600" }}>
                        麦币
                    </Typography>

                    {/* Tab navigation */}
                    <Tabs
                        value={activeTab}
                        textColor="inherit"
                        className={Style.tab_buttons}
                    >
                        <Tab label="首页" value="home" className={Style.v_btn} />
                        <Tab label="关于" value="about" className={Style.v_btn} />
                    </Tabs>

                    {/* Desktop buttons */}
                    <div className="d-none d-md-flex" style={{ display: "flex" }}>
                        <Button style={{ marginRight: 8 }}>
                            登录
                        </Button>
                        <Button style={{ marginRight: 25 }} className={Style.register}>
                            注册
                        </Button>
                    </div>

                    {/* Mobile menu */}
                    <div className="d-flex d-md-none" style={{ display: "flex" }}>
                        <Button onClick={handleMenuClick}>菜单</Button>
                        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => handleMenuClose()}>
                            <MenuItem>登录</MenuItem>
                            <MenuItem>注册</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Container>
                {/* React Router's outlet for displaying the content */}
                <div> {/* Replace this with <Outlet /> if using React Router v6 */}
                    {/* Here you can use `Routes` and `Route` components for nested routing */}
                </div>
            </Container>
        </div>
    );
}

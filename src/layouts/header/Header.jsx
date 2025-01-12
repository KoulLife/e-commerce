'use client'

import React, {use, useEffect, useState} from 'react';
import styles from './Header.module.scss';
import Link from "next/link";
import {auth} from "@/firebase/firebase";
import {signOut, onAuthStateChanged} from "firebase/auth";
import {toast} from "react-toastify";
import {router} from "next/client";
import {usePathname} from "next/navigation";
import InnerHeader from "@/layouts/innerHeader/InnerHeader";

const Header = () => {

    const pathName = usePathname();

    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user', user);
            if (user) {

                if (user.displayName === null) {
                    const u1 = user.email.substring(0, user.email.indexOf('@'));
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
                    setDisplayName(uName);
                } else {
                    setDisplayName(user.displayName);
                }

                // save user info in redux
            } else {
                setDisplayName('');
                // 유저 정보 리덕스 스토어에서 지우기
            }
        })
    }, [])

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                toast.success(`로그아웃 되었습니다.`);
                router.push('/');
            })
            .catch((err) => {
                toast.error(err.message);
            })
    }

    if (pathName === '/login' || pathName === '/register' || pathName === '/reset') {
        return null;
    }

    return (
        <header>
            <div className={styles.loginBar}>
                <ul className={styles.list}>


                    <li className={styles.item}>
                        <Link href={"/login"}>
                            로그인
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/admin/dashboard"}>
                            관리자
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/order-history"}>
                            주문 목록
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"} onClick={logoutUser}>
                            로그아웃
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"}>
                            제휴 마케팅
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"}>
                            쿠팡 플레이
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"}>
                            고객센터
                        </Link>
                    </li>
                </ul>
            </div>
            {
                pathName.startsWith('/admin') ?
                    null :
                    <InnerHeader/>
            }
        </header>
    );
};

export default Header;
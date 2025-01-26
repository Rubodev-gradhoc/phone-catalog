'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import useCartStore from '@/app/store/cartStore';

const NavBar = () => {
    const cartCount = useCartStore((state: any) => state.cart.length);
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className={styles.logo}
                />
            </Link>

            <Link href="/cart" className={styles.cartContainer}>
                <Image
                    src="/cart.svg"
                    alt="cart"
                    width={9}
                    height={16}
                    className={styles.cart}
                />
                <span className={styles.cartCount}>{cartCount}</span>
            </Link>
        </nav>
    );
};

export default NavBar;

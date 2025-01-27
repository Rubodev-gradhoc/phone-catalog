'use client';
import React, { useEffect, useState } from 'react';
import useCartStore from '../store/cartStore';
import CartCard from '../components/CartCard/CartCard';
import Button from '../components/Button/Button';
import styles from './Cart.module.css';
import { useRouter } from 'next/navigation';
import useToastStore from '../store/useToastStore';
import { useTranslations } from 'next-intl';

const Cart = () => {
    const t = useTranslations('Cart');
    const router = useRouter();
    const phonesCart = useCartStore((state: any) => state.cart);
    const clearCart = useCartStore((state: any) => state.clearCart);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const total = phonesCart.reduce((acc, phone) => acc + phone.price, 0);

    const handleGoHome = () => {
        router.push('/');
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 425);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showToast = useToastStore(state => state.showToast);

    const handleClick = () => {
        clearCart();
        showToast(t('toast.success'), t('toast.action'), () => {
            router.push('/');
        });
    };
    return (
        <main className={styles.main}>
            <header>{t('header', { count: phonesCart.length })}</header>
            <section className={styles.content}>
                {phonesCart.map((phone: any) => (
                    <CartCard key={phone.id} phone={phone} />
                ))}
            </section>
            <footer className={styles.buttonContainer}>
                {isSmallScreen ? (
                    <>
                        <div className={styles.totalMin}>
                            <p>{t('total.label')}:</p>
                            <p>{total} EUR</p>
                        </div>
                        <div className={styles.totalAndPay}>
                            <Button
                                outline
                                className={styles.continueButton}
                                onClick={handleGoHome}
                            >
                                {t('button.continue')}
                            </Button>
                            {phonesCart.length > 0 && (
                                <Button
                                    className={styles.payButton}
                                    onClick={handleClick}
                                >
                                    {t('button.pay')}
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Button
                            outline
                            className={styles.continueButton}
                            onClick={handleGoHome}
                        >
                            {t('button.continue')}
                        </Button>
                        {phonesCart.length > 0 && (
                            <div className={styles.totalAndPay}>
                                <p className={styles.total}>
                                    {t('total.full', { total })} EUR
                                </p>
                                <Button
                                    className={styles.payButton}
                                    onClick={handleClick}
                                >
                                    {t('button.pay')}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </footer>
        </main>
    );
};

export default Cart;

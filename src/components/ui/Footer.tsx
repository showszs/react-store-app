import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3>About Store</h3>
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contacts">Contacts</a></li>
                            <li><a href="#blog">Blog</a></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h3>For Customers</h3>
                        <ul>
                            <li><a href="#shipping">Shipping</a></li>
                            <li><a href="#returns">Returns</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h3>Stay updated</h3>
                        <form className={styles.newsletter}>
                            <input
                                type="email"
                                placeholder="Your email"
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; 2026 Store. All rights reserved.</p>
                    <div className={styles.links}>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
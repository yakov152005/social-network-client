import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_LOGIN } from "../../utils/Constants";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

export default function AccessibilityStatement() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 text-gray-800 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                dir="rtl"
                className="max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-10 border border-purple-500 space-y-8 text-right login-card"
            >


                <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                    הצהרת נגישות באתר
                </h1>


                <motion.p
                    initial={{opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="leading-7 text-gray-700"
                >
                    אנו מכירים בחשיבות של מתן שירות שוויוני ונגיש לכלל המבקרים באתרנו, כולל אנשים עם מוגבלויות.
                    אנו משקיעים מאמצים רבים כדי להנגיש את האתר ולהתאימו למגוון רחב של משתמשים.
                </motion.p>


                <h2 className="text-2xl font-semibold text-blue-500">מה אנו עושים כדי לשפר את הנגישות?</h2>
                <ul className="space-y-4 pr-2">
                    {[
                        "תמיכה בטכנולוגיות מסייעות כמו קוראי מסך.",
                        "אפשרות ניווט נוחה באמצעות מקלדת בלבד.",
                        "התאמות צבעים וניגודיות לשיפור קריאות הטקסט.",
                        "טקסטים חלופיים (alt) לכל התמונות והאייקונים.",
                        "שימוש בכותרות מסודרות (H1, H2 וכו') להנגשה טובה יותר.",
                        "אפשרות הגדלת טקסט ולחצנים להקלה על הקריאה."
                    ].map((item, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 * index }}
                            className="flex items-start gap-3 text-gray-700"
                        >
                            <FaCheckCircle className="text-green-500 mt-1" />
                            {item}
                        </motion.li>
                    ))}
                </ul>


                <h2 className="text-2xl font-semibold text-blue-500">שימוש בתוספי נגישות</h2>
                <p className="text-gray-700 leading-7">
                    האתר משתמש בטכנולוגיות נגישות מתקדמות ומעודכן בהתאם לתקני הנגישות המחמירים ביותר, כולל
                    <strong> תקן WCAG 2.1 ברמה AA.</strong> ייתכן כי עדיין יימצאו חלקים לא מונגשים ואנו פועלים לתקנם.
                </p>


                <h2 className="text-2xl font-semibold text-blue-500">דרכי יצירת קשר לתמיכה ולפניות</h2>
                <p className="text-gray-700 leading-7">
                    אם נתקלתם בבעיה כלשהי או יש לכם הערות והצעות לשיפור, נשמח לשמוע מכם:
                </p>
                <div className="space-y-2 text-gray-700">
                    📧 <strong>דוא"ל:</strong> <a className="underline text-blue-400" href="mailto:servicenetwork62@gmail.com">servicenetwork62@gmail.com</a><br/>
                    📞 <strong>טלפון:</strong> 052-6650754<br/>
                    🏢 <strong>כתובת:</strong> אשקלון, ישראל
                </div>


                <h2 className="text-2xl font-semibold text-blue-500">עדכון והנגשת מידע</h2>
                <p className="text-gray-700 leading-7">
                    אנו שואפים לשפר את רמת הנגישות של האתר באופן מתמיד ולספק מענה מלא לכל צרכי הגולשים.
                    הצהרת נגישות זו עודכנה לאחרונה בתאריך: <strong>מרץ 2025</strong>.
                </p>


                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center pt-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(NAV_LOGIN)}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-400 rounded-xl shadow-md font-semibold text-white text-lg"
                    >
                        <span>חזרה לדף התחברות</span>
                        <motion.span
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ArrowRight size={22} />
                        </motion.span>
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    );
}

import { useEffect } from "react";
import { motion } from "framer-motion";
import { NAV_LOGIN } from "../../utils/Constants";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function TermsAndPrivacy() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 text-gray-800 p-6">

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                dir="rtl"
                className="max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-10 border border-purple-500 space-y-8 text-right login-card"
            >


                <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                    📜 תקנון, תנאי שימוש ומדיניות פרטיות
                </h1>


                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3}}
                    className="leading-7 text-gray-700"
                >
                    ברוכים הבאים לאתר <strong>Social Network</strong>.
                    השימוש באתר כפוף לתנאים המפורטים להלן. אם אינך מסכים לתנאים אלה, הנך מתבקש להימנע משימוש באתר.
                </motion.p>


                {[
                    {
                        title: "📌 כללי",
                        content: "תנאים אלה מהווים הסכם מחייב בינך לבין הנהלת האתר. האתר מיועד לשימוש אישי בלבד, ולא לשימוש מסחרי ללא אישור מפורש מראש. השימוש באתר מותר לכל הגילאים, אך משתמשים מתחת לגיל 18 נדרשים לקבל אישור הורה או אפוטרופוס."
                    },
                    {
                        title: "📌 פרטיות ואבטחת מידע",
                        list: [
                            "המידע האישי של המשתמשים יישמר בהתאם למדיניות הפרטיות של האתר.",
                            "לא נעשה שימוש במידע לצרכים מסחריים ללא הסכמת המשתמש.",
                            "למרות מאמצי האבטחה, אין האתר יכול להבטיח הגנה מוחלטת מפני חדירות לא מורשות.",
                            "אנו משתמשים בקובצי Cookies כדי לשפר את חוויית המשתמש ולבצע התאמות אישיות באתר.",
                            "בלחיצה על הסכם הרשמה, אני מסכים שישלחו אלי פרסומים למייל, והודעות SMS לאימות דו שלבי."
                        ]
                    },
                    {
                        title: "📌 שימוש באתר",
                        list: [
                            "חל איסור על הפצת תכנים בלתי חוקיים, פוגעניים או מזיקים באתר.",
                            "הנהלת האתר רשאית להסיר משתמשים שיפרו את התקנון ולחסום גישה ללא הודעה מוקדמת.",
                            "המשתמש מתחייב שלא לבצע שימוש לרעה בתוכן הלימודי או במערכת האתר.",
                            "המשתמש מסכים כי הנהלת האתר אינה נושאת באחריות לתוכן שהוזן על ידי צד שלישי."
                        ]
                    },
                    {
                        title: "📌 זכויות יוצרים וקניין רוחני",
                        content: "כל התכנים באתר, כולל טקסטים, קורסים, סרטונים, תמונות, קוד ותוכנות, מוגנים בזכויות יוצרים. אין להעתיק, להפיץ, לשכפל, לשנות או להשתמש בתכנים ללא אישור מראש."
                    },
                    {
                        title: "📌 ביטולים והחזרים",
                        list: [
                            "במקרה של בעיה טכנית המונעת גישה לאתר, המשתמש מתבקש ליצור קשר עם שירות הלקוחות.",
                            "הנהלת האתר שומרת לעצמה את הזכות להציע החזר או קרדיט לשימוש עתידי בהתאם למקרה."
                        ]
                    },
                    {
                        title: "📌 אחריות האתר",
                        list: [
                            "אין לראות במידע באתר כהבטחה לתוצאה כלשהי, וכל שימוש במידע נעשה על אחריות המשתמש בלבד.",
                            "האתר אינו אחראי לכל נזק ישיר או עקיף שייגרם למשתמשים עקב השימוש בשירותים.",
                            "התכנים באתר ניתנים כמות שהם (AS IS), ללא אחריות לנכונותם המלאה."
                        ]
                    },
                    {
                        title: "📌 יצירת קשר",
                        content: (
                            <>
                                אם יש לכם שאלות או בעיות או הצעות לשיפור, נשמח לשמוע ממכם!
                                <div className="space-y-2 text-gray-700 mt-2">
                                    📧 <strong>דוא"ל:</strong> <a className="underline text-blue-400"
                                                                 href="mailto:servicenetwork62@gmail.com">servicenetwork62@gmail.com</a><br/>
                                    📞 <strong>טלפון:</strong> 052-6650754<br/>
                                    🏢 <strong>כתובת:</strong> אשקלון, ישראל
                                </div>
                            </>
                        )
                    },
                    {
                        title: "📌 עדכון אחרון",
                        content: <strong>מרץ 2025</strong>
                    }
                ].map((section, idx) => (
                    <div key={idx} className="space-y-4">
                        <h2 className="text-2xl font-semibold text-blue-500">{section.title}</h2>
                        {section.content && <p className="text-gray-700 leading-7">{section.content}</p>}
                        {section.list && (
                            <ul className="space-y-4 pr-2">
                                {section.list.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{opacity: 0, x: 10}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.2 * index}}
                                        className="flex items-start gap-3 text-gray-700"
                                    >
                                        <FaCheckCircle className="text-green-500 mt-1" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}

                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1}}
                    className="flex justify-center pt-4"
                >
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                        onClick={() => navigate(NAV_LOGIN)}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-400 rounded-xl shadow-md font-semibold text-white text-lg"
                    >
                        <span>חזרה לדף התחברות</span>
                        <motion.span
                            initial={{x: -5}}
                            whileHover={{x: 0}}
                            transition={{type: "spring", stiffness: 300}}
                        >
                            <ArrowRight size={22}/>
                        </motion.span>
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    );
}

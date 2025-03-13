import "../../css/websiteRegulations/TermsAndPrivacyStyle.css";
import {useEffect} from "react";

export default function TermsAndPrivacy() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="terms-container">
            <h1>📜 תקנון, תנאי שימוש ומדיניות פרטיות</h1>
            <p>
                ברוכים הבאים לאתר <strong>Social Network</strong>.
                השימוש באתר כפוף לתנאים המפורטים להלן. אם אינך מסכים לתנאים אלה, הנך מתבקש להימנע משימוש באתר.
            </p>

            <h2>📌 כללי</h2>
            <p>
                תנאים אלה מהווים הסכם מחייב בינך לבין הנהלת האתר. האתר מיועד לשימוש אישי בלבד, ולא לשימוש מסחרי ללא אישור מפורש מראש.
                השימוש באתר מותר לכל הגילאים, אך משתמשים מתחת לגיל 18 נדרשים לקבל אישור הורה או אפוטרופוס.
            </p>

            <h2>📌 פרטיות ואבטחת מידע</h2>
            <ul>
                <li>המידע האישי של המשתמשים יישמר בהתאם למדיניות הפרטיות של האתר.</li>
                <li>לא נעשה שימוש במידע לצרכים מסחריים ללא הסכמת המשתמש.</li>
                <li>למרות מאמצי האבטחה, אין האתר יכול להבטיח הגנה מוחלטת מפני חדירות לא מורשות.</li>
                <li>אנו משתמשים בקובצי **Cookies** כדי לשפר את חוויית המשתמש ולבצע התאמות אישיות באתר.</li>
                <li>בלחיצה על הסכם הרשמה, אני מסכים שישלחו אלי פרסומים למייל, והודעות SMS לאימות דו שלבי.</li>
            </ul>

            <h2>📌 שימוש באתר</h2>
            <ul>
                <li>חל איסור על הפצת תכנים בלתי חוקיים, פוגעניים או מזיקים באתר.</li>
                <li>הנהלת האתר רשאית להסיר משתמשים שיפרו את התקנון ולחסום גישה ללא הודעה מוקדמת.</li>
                <li>המשתמש מתחייב שלא לבצע שימוש לרעה בתוכן הלימודי או במערכת האתר.</li>
                <li>המשתמש מסכים כי הנהלת האתר אינה נושאת באחריות לתוכן שהוזן על ידי צד שלישי.</li>
            </ul>

            <h2>📌 זכויות יוצרים וקניין רוחני</h2>
            <p>
                כל התכנים באתר, כולל טקסטים, קורסים, סרטונים, תמונות, קוד ותוכנות, מוגנים בזכויות יוצרים.
                אין להעתיק, להפיץ, לשכפל, לשנות או להשתמש בתכנים ללא אישור מראש.
            </p>

            <h2>📌 ביטולים והחזרים</h2>
            <ul>
                <li>במקרה של בעיה טכנית המונעת גישה לאתר, המשתמש מתבקש ליצור קשר עם שירות הלקוחות.</li>
                <li>הנהלת האתר שומרת לעצמה את הזכות להציע החזר או קרדיט לשימוש עתידי בהתאם למקרה.</li>
            </ul>

            <h2>📌 אחריות האתר</h2>
            <ul>
                <li>אין לראות במידע באתר כהבטחה לתוצאה כלשהי, וכל שימוש במידע נעשה על אחריות המשתמש בלבד.</li>
                <li>האתר אינו אחראי לכל נזק ישיר או עקיף שייגרם למשתמשים עקב השימוש בשירותים.</li>
                <li>התכנים באתר ניתנים **כמות שהם (AS IS)**, ללא אחריות לנכונותם המלאה.</li>
            </ul>

            <h2>📌 יצירת קשר</h2>
            <p>אם יש לכם שאלות או בעיות או הצעות לשיפור, נשמח לשמוע ממכם!</p>
            <p>
                📧 <strong>דוא"ל:</strong> <a href="mailto:servicenetwork62@gmail.com">servicenetwork62@gmail.com</a><br />
                📞 <strong>טלפון:</strong> 052-6650754<br />
                🏢 <strong>כתובת:</strong> אשקלון, ישראל
            </p>

            <h2>📌 עדכון אחרון</h2>
            <p><strong>מרץ 2025</strong></p>
        </div>
    );
}

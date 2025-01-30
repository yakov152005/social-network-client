import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {NAV_LOGIN, URL_CONFIRM_RESET_PASS, URL_SERVER_SIDE} from "../../utils/Constants";

export default function ConfirmResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            Swal.fire("Error", "Invalid token.", "error");
            navigate(NAV_LOGIN);
        }
    }, [token, navigate]);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CONFIRM_RESET_PASS, null, {
                params: { token: token }
            });

            if (response.data.success) {
                Swal.fire("Success!", "Your password has been reset. Check your email for the new password.", "success");
                navigate(NAV_LOGIN);
            } else {
                Swal.fire("Error", response.data.error, "error");
                navigate(NAV_LOGIN);
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong.", "error");
        }
        setLoading(false);
    };

    return (
        <div className={"box-drop-zone"}>
            <h2>Confirm Password Reset</h2>
            <p><strong>Click the button below to reset your password.</strong></p>
            <button className={"btn btn-secondary"} onClick={handleConfirm} disabled={loading}>
                {loading ? "Processing...⌛" : "Confirm Reset ✅"}
            </button>
        </div>
    );
}

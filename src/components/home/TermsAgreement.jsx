import { useState } from "react";
import { Checkbox, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import TermsAndPrivacy from "../websiteRegulations/TermsAndPrivacy";
import AccessibilityStatement from "../websiteRegulations/AccessibilityStatement";

const TermsAgreement = ({ setConfirmRadio }) => {
    const [checked, setChecked] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);
    const [openAccessibility, setOpenAccessibility] = useState(false);

    const handleCheck = () => {
        setChecked(!checked);
        setConfirmRadio(!checked);
    };

    return (
        <div style={{ fontSize: "10px", marginBottom: "15px", whiteSpace: "nowrap" }}>
            <Checkbox checked={checked} onClick={handleCheck} />
            By signing up, I agree to the
            <span style={{ fontWeight: "bold" }}>
                {" "}
                <button
                    className="btn btn-link"
                    style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        display: "inline",
                        padding: "0",
                        border: "none",
                        background: "none",
                    }}
                    onClick={() => setOpenTerms(true)}
                >
                    terms and conditions & privacy policy
                </button>
            </span>
            <p style={{ marginLeft: "35px" }}>
                , and I read the
                <button
                    className="btn btn-link"
                    style={{
                        fontSize: "10px",
                        fontWeight: "bold",
                        display: "inline",
                        padding: "0",
                        border: "none",
                        background: "none",
                        margin: "0 0 2px 5px",
                    }}
                    onClick={() => setOpenAccessibility(true)}
                >
                    accessibility
                </button>
                .
            </p>


            <Dialog open={openTerms} onClose={() => setOpenTerms(false)} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: "center", fontSize: "14px" }}>Terms & Privacy</DialogTitle>
                <DialogContent style={{ fontSize: "12px", textAlign: "left", background: "rgba(255,255,255,0.9)", borderRadius: "10px" }}>
                    <TermsAndPrivacy/>
                    <Button variant="contained" onClick={() => setOpenTerms(false)} fullWidth>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>


            <Dialog open={openAccessibility} onClose={() => setOpenAccessibility(false)} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: "center", fontSize: "14px" }}>Accessibility</DialogTitle>
                <DialogContent style={{ fontSize: "12px", textAlign: "left", background: "rgba(255,255,255,0.9)", borderRadius: "10px" }}>
                    <AccessibilityStatement/>
                    <Button variant="contained" onClick={() => setOpenAccessibility(false)} fullWidth>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TermsAgreement;

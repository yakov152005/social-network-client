import React, {useEffect, useState} from "react";
import axios from "axios";
import {URL_CHANGE_PASSWORD, URL_SERVER_SIDE} from "../../utils/Constants";
import UsernameAPI from "../../api/UsernameAPI";
import {Button} from "../ui/Button";
import {Input} from "../ui/Input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/Select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "../ui/AlertDialog";
import {Card, CardContent} from "../ui/Card";
import "../../styles/PopupStyle.css"
import {ChevronDown, LockIcon} from "lucide-react"
import showPass from "../../assets/form/show_password.png";
import hidePass from "../../assets/form/hide_password.png";


export default function ChangePassword() {
    const [username, setUsername] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [twoFOpen, setTwoFOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [twoFactor, setTwoFactor] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactor: ""
    });

    const [validation, setValidation] = useState({
        username: false,
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    const criteriaValues = Object.values(passwordCriteria);
    const passedCount = criteriaValues.filter(Boolean).length;


    let strength = "";
    let strengthColor = "";
    let labelColor = "";

    if (formData.newPassword.length > 0) {
        if (passedCount >= 4) {
            strength = "Strong";
            strengthColor = "bg-green-500";
            labelColor = "bg-green-500 text-white";
        } else if (passedCount >= 2) {
            strength = "Medium";
            strengthColor = "bg-yellow-400";
            labelColor = "bg-yellow-400 text-white";
        } else {
            strength = "Weak";
            strengthColor = "bg-red-500";
            labelColor = "bg-red-500 text-white";
        }
    }

    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(prevState => !prevState)
    };

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});

        const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
        const letterUpper = /[A-Z]/.test(value);
        const letterLower = /[a-z]/.test(value);
        const numbers = /[0-9]/.test(value);

        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value === username
                }));
                break;

            case "currentPassword": {
                setValidation((prev) => ({
                    ...prev,
                    currentPassword: value.length >= 8 && ((letterLower || letterUpper) && hasSpecialChar && numbers),
                }));
                break;
            }

            case "newPassword": {
                const isLengthValid = value.length >= 8;
                const hasUppercase = /[A-Z]/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecial = /[!@#$%^&*()-+=_]/.test(value);

                setPasswordCriteria({
                    length: isLengthValid,
                    uppercase: hasUppercase,
                    lowercase: hasLowercase,
                    number: hasNumber,
                    special: hasSpecial
                });

                setValidation((prev) => ({
                    ...prev,
                    newPassword: isLengthValid && (hasUppercase || hasLowercase) && hasNumber && hasSpecial
                }));
                break;
            }


            case "confirmPassword": {
                setValidation((prev) => ({
                    ...prev,
                    confirmPassword: value === formData.newPassword,
                }));
                break;
            }

            default:
                break;
        }
    };

    const changePassword = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMsg("⚠️ The new password and its confirmation do not match.");
            setFormData(prevState => ({
                ...prevState, newPassword: "", confirmPassword: "",
            }))
            return;
        }
        setConfirmDialogOpen(true);
    };


    const handleConfirmChange = async () => {
        setIsSubmitting(true);
        setConfirmDialogOpen(false);
        setErrorMsg(null);
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CHANGE_PASSWORD, {
                username: formData.username,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                twoFactor: twoFactor
            });

            if (response.data.success) {
                setSuccess(true);
                setFormData(prev => ({
                    ...prev,
                    username: "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }));
            } else {
                setErrorMsg("⚠️" + response.data.error);
                setFormData(prev => ({
                    ...prev,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }));
            }
            setTimeout(() => {
                setSuccess(false);
                setErrorMsg(null)
            }, 4000);
        } catch (error) {
            setErrorMsg("⚠️ Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
            setPasswordCriteria({
                length: false,
                uppercase: false,
                lowercase: false,
                number: false,
                special: false
            });
        }
    };

    useEffect(() => {
        console.log("twoFactor updated:", twoFactor);
    }, [twoFactor]);


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername, null, null, setTwoFactor);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleReset = () => {
        setFormData(prev => ({
            ...prev,
            username: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }));
    }


    return (
        <>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-start gap-6 flex-col md:flex-row">
                        <div className="md:w-2/3 space-y-6">
                            <div className="bg-red-50 text-green-500 px-4 py-3 rounded-md">
                                <h3 className="text-lg font-medium">Change Password</h3>
                            </div>
                            <p className="text-gray-500 text-sm">Update your password to keep your account secure</p>

                            <div className="space-y-4">

                                <div className="space-y-2">
                                    <label htmlFor="username" className="text-sm font-medium">Current
                                        Username</label>
                                    <Input
                                        type="text"
                                        className={`${formData.username && formData.username.length ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.username === "" ? "" : validation.username ? 'is-valid' : 'is-invalid'}`}
                                        id="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    <div className="valid-feedback">approved!</div>
                                    <div className="invalid-feedback">Enter your username...</div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="currentPassword" className="text-sm font-medium">Current
                                        Password</label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={!showPassword ? "password" : "text"}
                                            className={`pr-10 ${formData.currentPassword && formData.currentPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.currentPassword === "" ? "" : validation.currentPassword ? 'is-valid' : 'is-invalid'}`}
                                            placeholder="••••••••"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                        />
                                        {formData.currentPassword?.length > 0 && (
                                            <img
                                                src={!showPassword ? showPass : hidePass}
                                                alt="Toggle Password"
                                                onClick={handleShowPassword}
                                                className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                                            />
                                        )}
                                    </div>

                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Enter your password...
                                    </div>

                                </div>


                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="text-sm font-medium">New
                                        Password</label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={!showNewPassword ? "password" : "text"}
                                            className={`pr-10 ${formData.newPassword && formData.newPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.newPassword === "" ? "" : validation.newPassword ? 'is-valid' : 'is-invalid'}`}
                                            placeholder="••••••••"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                        />

                                        {formData.newPassword?.length > 0 && (
                                            <img
                                                src={!showNewPassword ? showPass : hidePass}
                                                alt="Toggle Password"
                                                onClick={handleShowNewPassword}
                                                className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                                            />
                                        )}
                                    </div>
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Password must be at least 8 characters and contain a mix of letters,
                                        numbers,
                                        and
                                        special characters.
                                    </div>


                                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                                        <div
                                            className={`h-full transition-all duration-300 ${strengthColor}`}
                                            style={{width: `${(passedCount / 5) * 100}%`}}
                                        />
                                    </div>


                                    {formData.newPassword.length > 0 && (
                                        <div className="flex justify-end mt-1">
                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded ${labelColor}`}>
                                                {strength}
                                            </span>
                                        </div>
                                    )}


                                    <div className="mt-2 border-l-4 border-green-500 bg-gray-50 px-4 py-3 rounded-md">
                                        <h4 className="text-sm font-semibold text-green-600 mb-2">
                                            Password Requirements:
                                        </h4>
                                        <ul className="text-sm max-md:text-xs space-y-1 max-md:space-y-0.5 text-gray-600 max-md:pl-2">
                                            <li className={passwordCriteria.length ? "text-green-600 font-medium" : ""}>
                                                {passwordCriteria.length && "✅ "}At least 8 characters
                                            </li>
                                            <li className={passwordCriteria.uppercase ? "text-green-600 font-medium" : ""}>
                                                {passwordCriteria.uppercase && "✅ "}At least one uppercase letter
                                                (A-Z)
                                            </li>
                                            <li className={passwordCriteria.lowercase ? "text-green-600 font-medium" : ""}>
                                                {passwordCriteria.lowercase && "✅ "}At least one lowercase letter
                                                (a-z)
                                            </li>
                                            <li className={passwordCriteria.number ? "text-green-600 font-medium" : ""}>
                                                {passwordCriteria.number && "✅ "}At least one number (0-9)
                                            </li>
                                            <li className={passwordCriteria.special ? "text-green-600 font-medium" : ""}>
                                                {passwordCriteria.special && "✅ "}At least one special character
                                                (!@#$%^&*)
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium">Repeat
                                        Password</label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className={`${formData.confirmPassword && formData.confirmPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.confirmPassword === "" ? "" : validation.confirmPassword ? 'is-valid' : 'is-invalid'}`}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}

                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        The password confirmation must match the new password you entered.
                                    </div>
                                </div>

                                <div className="space-y-2 relative">
                                    <label htmlFor="twoFactor" className="text-sm font-medium text-gray-700">
                                        Two-factor authentication
                                    </label>
                                    <Select
                                        isOpen={twoFOpen}
                                        toggleOpen={() => setTwoFOpen(!twoFOpen)}
                                        selectedValue={twoFactor === "enabled" ? "Enabled" : "Disabled"}
                                        handleSelect={(value) => {
                                            setTwoFactor(value);
                                            setTwoFOpen(false);
                                        }}
                                    >
                                        <SelectTrigger
                                            className="bg-gray-50 rounded-lg text-sm flex justify-between items-center">
                                            <SelectValue
                                                selectedValue={twoFactor === "enabled" ? "Enabled" : "Disabled"}
                                                placeholder="Select option"
                                            />
                                            <ChevronDown className="h-4 w-4 text-gray-600"/>
                                        </SelectTrigger>

                                        <SelectContent className="z-[9999]">
                                            <SelectItem value="enabled">Enabled</SelectItem>
                                            <SelectItem value="disabled">Disabled</SelectItem>
                                        </SelectContent>
                                        <p className="text-xs text-gray-500 mt-1">
                                            When enabled, you'll need to enter a verification code sent to your
                                            phone.
                                        </p>

                                    </Select>
                                </div>

                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    className="btn btn-light"
                                    onClick={handleReset}
                                >
                                    <span style={{color: "gray", fontSize: "13px"}}>Cancel</span>
                                </Button>

                                <Button
                                    onClick={changePassword}
                                    disabled={!(formData.username && formData.currentPassword && formData.confirmPassword && (formData.username === username)) || isSubmitting}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </div>

                            {success && (
                                <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
                                    Changed password successfully!
                                </div>
                            )}
                            {errorMsg && (
                                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                                    {errorMsg}
                                </div>
                            )}
                        </div>

                        <div
                            className="md:w-1/3 flex flex-col items-center justify-center text-center space-y-4 pt-6 md:pt-0">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <LockIcon className="h-8 w-8 text-green-400"/>
                            </div>
                            <h4 className="font-medium text-green-400">Password Security</h4>
                            <p className="text-sm text-gray-500">
                                Keep your password in a safe place and do not write it down in places that could be
                                exposed.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to change your password?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Make sure you've saved your new password somewhere safe.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setConfirmDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmChange}>
                            Yes, change password
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}

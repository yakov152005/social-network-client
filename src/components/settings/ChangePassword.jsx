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


export default function ChangePassword() {
    const [username, setUsername] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [twoFOpen, setTwoFOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [twoFactor, setTwoFactor] = useState(null);
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
                setValidation((prev) => ({
                    ...prev,
                    newPassword: value.length >= 8 && ((letterLower || letterUpper) && hasSpecialChar && numbers),
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
            setErrorMsg("The new password and its confirmation do not match.");
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
                setFormData({
                    username: "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                setErrorMsg(response.data.error);
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            }
            setTimeout(() => {
                setSuccess(false);
                setErrorMsg(null)
            }, 3000);
        } catch (error) {
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        console.log("twoFactor updated:", twoFactor);
    }, [twoFactor]);


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername,null , null,setTwoFactor);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleReset = () => {
        setFormData({
            username: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
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
                                        className={`${formData.username.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.username === "" ? "" : validation.username ? 'is-valid' : 'is-invalid'}`}
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
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        className={`${formData.currentPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.currentPassword === "" ? "" : validation.currentPassword ? 'is-valid' : 'is-invalid'}`}
                                        placeholder="••••••••"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Enter your password...
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        className={`${formData.newPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.newPassword === "" ? "" : validation.newPassword ? 'is-valid' : 'is-invalid'}`}
                                        placeholder="••••••••"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">
                                        Password must be at least 8 characters and contain a mix of letters, numbers,
                                        and
                                        special characters.
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium">Repeat
                                        Password</label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className={`${formData.confirmPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.confirmPassword === "" ? "" : validation.confirmPassword ? 'is-valid' : 'is-invalid'}`}
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
                                        <SelectTrigger className="bg-gray-50 rounded-lg text-sm flex justify-between items-center">
                                            <SelectValue
                                                selectedValue={twoFactor === "enabled" ? "Enabled" : "Disabled"}
                                                placeholder="Select option"
                                            />
                                            <ChevronDown className="h-4 w-4 text-gray-600" />
                                        </SelectTrigger>

                                        <SelectContent className="z-[9999]">
                                            <SelectItem value="enabled">Enabled</SelectItem>
                                            <SelectItem value="disabled">Disabled</SelectItem>
                                        </SelectContent>
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

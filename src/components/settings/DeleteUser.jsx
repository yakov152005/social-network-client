import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {NAV_CREATE_ACCOUNT, PATH, URL_DELETE_USER, URL_SERVER_SIDE} from "../../utils/Constants";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "../ui/AlertDialog";
import { Card, CardContent } from "../ui/Card";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import {ShieldAlert} from "lucide-react";


export default function DeleteUser(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUsername] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [validation, setValidation] = useState({
        username: false,
        password: false,
        confirmPassword: false,
    });

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);


    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});

        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value === username,
                }));
                break;

            case "password": {
                setValidation((prev) => ({
                    ...prev,
                    password: value.length >= 8 ,
                }));
                break;
            }

            case "confirmPassword": {
                setValidation((prev) => ({
                    ...prev,
                    confirmPassword: value === formData.password,
                }));
                break;
            }

            default:
                break;
        }
    };

    const handleReset = () =>{
        setFormData({
            username: "",
            password: "",
            confirmPassword: ""
        })
    }

    const deleteUser = async () => {
            setIsSubmitting(true);
            setShowConfirmDialog(false);

            try {
                const response =
                    await axios.delete(
                        URL_SERVER_SIDE + URL_DELETE_USER + `/${formData.username}&${formData.password}`
                    );
                if (response.data.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: response.data.error,
                        icon: "success",
                        background: "#1a1a2e",
                        color: "#ffffff",
                        confirmButtonColor: "#5269bc",
                        customClass: {
                            popup: "swal-custom-popup",
                            container: "swal2-container",
                            title: "swal-custom-title",
                            confirmButton: "swal-custom-confirm",
                        }
                    });
                    cookies.remove("token", { path: PATH });
                    navigate(NAV_CREATE_ACCOUNT);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete user.",
                        icon: "error",
                        background: "#1a1a2e",
                        color: "#ffffff",
                        confirmButtonColor: "#5269bc",
                        customClass: {
                            popup: "swal-custom-popup",
                            container: "swal2-container",
                            title: "swal-custom-title",
                            confirmButton: "swal-custom-confirm",
                        }
                    });
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire({
                    title: "Oops!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    background: "#1a1a2e",
                    color: "#ffffff",
                    confirmButtonColor: "#5269bc",
                    customClass: {
                        popup: "swal-custom-popup",
                        container: "swal2-container",
                        title: "swal-custom-title",
                        confirmButton: "swal-custom-confirm",
                    }
                });
            }finally {
                setIsSubmitting(false);
            }
    };

    return (
        <>
            <Card className="border-red-100">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-6 flex-col md:flex-row">
                        <div className="md:w-2/3 space-y-6">
                            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
                                <h3 className="text-lg font-medium">Delete Account</h3>
                            </div>
                            <p className="text-gray-500 text-sm">This action cannot be undone. Please enter your credentials to confirm.</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="username" className="text-sm font-medium">Username</label>
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
                                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                                    <Input
                                        type="password"
                                        className={`${formData.password.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.password === "" ? "" : validation.password ? 'is-valid' : 'is-invalid'}`}
                                        id="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="valid-feedback">Its ok!</div>
                                    <div className="invalid-feedback">
                                        Enter your password...
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm
                                        Password</label>
                                    <Input
                                        type="password"
                                        className={`${formData.confirmPassword.length > 0 ? "form-control" : "bg-gray-100 rounded-lg text-sm"} ${formData.confirmPassword === "" ? "" : validation.confirmPassword ? 'is-valid' : 'is-invalid'}`}
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <div className="valid-feedback">Its ok!</div>
                                    <div className="invalid-feedback">
                                        The password confirmation must match the current password you entered.
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    className="btn btn-light"
                                    onClick={handleReset}
                                >
                                    <span style={{color:"gray", fontSize:"13px"}}>Cancel</span>
                                </Button>
                                <Button
                                    disabled={
                                        !(
                                            formData.username &&
                                            formData.password &&
                                            formData.confirmPassword &&
                                            formData.username === username
                                        ) || isSubmitting
                                    }
                                    onClick={() => setShowConfirmDialog(true)}
                                    variant="destructive"
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    <span style={{ color: "white", fontSize: "13px" }}>
                                        {isSubmitting ? "Deleting..." : "Delete Account"}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <div className="md:w-1/3 flex flex-col items-center justify-center text-center space-y-4 pt-6 md:pt-0">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <ShieldAlert className="h-8 w-8 text-red-600" />
                            </div>
                            <h4 className="font-medium text-red-600">Warning!</h4>
                            <p className="text-sm text-gray-500">
                                Deleting your account will permanently remove all your data and content without any way to recover it.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={showConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={deleteUser}>
                            Yes, delete my account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}
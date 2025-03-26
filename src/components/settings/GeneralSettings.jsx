import React, {useEffect, useState} from 'react';
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Card, CardContent } from "../ui/Card";
import axios from "axios";
import {URL_CHANGE_USER_SETTINGS, URL_SERVER_SIDE} from "../../utils/Constants";
import {ChevronDown} from "lucide-react";
import img_null from "../../assets/navbar/User_Profile_null.png"
import LoadingOverlay from "../loaders/LoadingOverlay";

export default function GeneralSettings({ userData,fetchUserData }) {
    const [formData, setFormData] = useState({});
    const [genderOpen, setGenderOpen] = useState(false);
    const [relationshipOpen, setRelationshipOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username || '',
                email: userData.email || '',
                profilePicture: userData.profilePicture || img_null,
                bio: userData.bio || '',
                gender: userData.gender || 'Prefer not to say',
                relationship: userData.relationship || 'None',
                fullName: userData.fullName || ""
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSuccess(false);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CHANGE_USER_SETTINGS,{
                username: formData.username,
                bio: formData.bio,
                gender: formData.gender,
                relationship: formData.relationship,
                fullName: formData.fullName
            })
            if (response.data.success){
                setSuccess(true);
                const newData = response.data.userSettingsDto;
                setFormData(newData);
            }else {
                console.log(response.data.error);
            }
            setTimeout(() => {
                setSuccess(false);
                fetchUserData();
            }, 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!userData) return (
        <div>
            <LoadingOverlay text="Loading your details, Wait a few moments..."/>
        </div>
    );

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-6">


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="usernameGeneral"
                                   className="text-sm font-medium text-gray-700">Username</label>
                            <Input
                                id="usernameGeneral"
                                name="username"
                                value={formData.username || ""}
                                disabled
                                className="bg-gray-100 rounded-lg text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email || ""}
                                disabled
                                className="bg-gray-100 rounded-lg text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="fullName"
                                   className="text-sm font-medium text-gray-700">Full Name</label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName || ""}
                                onChange={handleInputChange}
                                className="bg-gray-100 rounded-lg text-sm"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Enter your bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="min-h-[100px] bg-gray-100 rounded-lg text-sm"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
                            <Select
                                isOpen={genderOpen}
                                toggleOpen={() => setGenderOpen(!genderOpen)}
                                selectedValue={formData.gender}
                                handleSelect={(value) => {
                                    handleSelectChange('gender', value);
                                    setGenderOpen(false);
                                }}
                            >
                                <SelectTrigger
                                    className="bg-gray-100 rounded-lg text-sm flex justify-between items-center">
                                    <SelectValue selectedValue={formData.gender} placeholder="Select gender"/>
                                    <ChevronDown className="h-4 w-4 text-gray-600"/>
                                </SelectTrigger>
                                <SelectContent className="z-[9999]">
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="space-y-2 relative">
                            <label htmlFor="relationship" className="text-sm font-medium text-gray-700">Relationship
                                Status</label>
                            <Select
                                isOpen={relationshipOpen}
                                toggleOpen={() => setRelationshipOpen(!relationshipOpen)}
                                selectedValue={formData.relationship}
                                handleSelect={(value) => {
                                    handleSelectChange('relationship', value);
                                    setRelationshipOpen(false);
                                }}
                            >
                                <SelectTrigger
                                    className="bg-gray-100 rounded-lg text-sm flex justify-between items-center">
                                    <SelectValue selectedValue={formData.relationship}
                                                 placeholder="Select relationship status"/>
                                    <ChevronDown className="h-4 w-4 text-gray-600"/>
                                </SelectTrigger>
                                <SelectContent className="z-[9999]">
                                    <SelectItem value="Single">Single</SelectItem>
                                    <SelectItem value="In a relationship">In a relationship</SelectItem>
                                    <SelectItem value="Married">Married</SelectItem>
                                    <SelectItem value="It's complicated">It's complicated</SelectItem>
                                    <SelectItem value="None">None</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" className="btn btn-light"><span
                            style={{color: "gray", fontSize: "13px"}}>Cancel</span></Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-gray-700 hover:bg-gray-950"
                        >
                            <span style={{color: "white", fontSize: "13px"}}>{isSubmitting ? 'Saving...' : 'Save'}</span>
                        </Button>
                    </div>

                    {success && (
                        <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
                            Profile updated successfully!
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
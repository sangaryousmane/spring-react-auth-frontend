import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppContext } from "../../context/AppContext";
import { profileService } from "../../services";

const Profile = () => {

    const {
        userData,
        setUserData
    } = useContext(AppContext);

    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState(null);


    useEffect(() => {

        const loadProfile = async () => {

            // If AppContext already has the user,
            // use that data immediately.

            if (userData) {

                setProfile(userData);

                return;
            }

            setLoading(true);

            try {

                const response =
                    await profileService.getProfile();

                if (response.status === 200) {

                    setProfile(response.data);

                    setUserData(response.data);
                }

            } catch (error) {

                console.error(
                    "Unable to load profile:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load profile."
                );

            } finally {

                setLoading(false);
            }
        };

        void loadProfile();

    }, [userData, setUserData]);


    if (loading) {

        return (
            <div className="container mt-5 text-center">

                <div
                    className="spinner-border"
                    role="status"
                />

                <p className="mt-3">
                    Loading profile...
                </p>

            </div>
        );
    }


    if (!profile) {

        return (
            <div className="container mt-5 text-center">

                <h4>
                    Unable to load profile
                </h4>

            </div>
        );
    }


    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-sm border-0 rounded-4">

                        <div className="card-body p-5">


                            {/* Header */}

                            <div className="text-center mb-4">

                                <div
                                    className="rounded-circle bg-primary
                                    text-white d-flex align-items-center
                                    justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "32px"
                                    }}
                                >

                                    {profile.name
                                        ?.charAt(0)
                                        ?.toUpperCase()
                                    }

                                </div>


                                <h3 className="fw-bold">

                                    {profile.name}

                                </h3>


                                <p className="text-muted">

                                    {profile.email}

                                </p>

                            </div>


                            <hr />


                            {/* Account Information */}

                            <h5 className="fw-bold mb-4">

                                Account Information

                            </h5>


                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>
                                        User ID
                                    </strong>

                                </div>

                                <div className="col-md-8 text-muted">

                                    {profile.userId}

                                </div>

                            </div>


                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>
                                        Full Name
                                    </strong>

                                </div>

                                <div className="col-md-8">

                                    {profile.name}

                                </div>

                            </div>


                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>
                                        Email
                                    </strong>

                                </div>

                                <div className="col-md-8">

                                    {profile.email}

                                </div>

                            </div>


                            {/* Account Verification */}

                            <div className="row mb-3">

                                <div className="col-md-4">

                                    <strong>
                                        Account Status
                                    </strong>

                                </div>

                                <div className="col-md-8">

                                    {profile.isAccountVerified ? (

                                        <span className="badge bg-success">

                                            Verified

                                        </span>

                                    ) : (

                                        <span className="badge bg-warning text-dark">

                                            Not Verified

                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* Roles */}

                            <div className="row mb-4">

                                <div className="col-md-4">

                                    <strong>
                                        Roles
                                    </strong>

                                </div>

                                <div className="col-md-8">

                                    {profile.roles?.length > 0 ? (

                                        profile.roles.map(
                                            (role) => (

                                                <span
                                                    key={
                                                        role.roleId ||
                                                        role.id ||
                                                        role.name
                                                    }
                                                    className="badge
                                                    bg-primary me-2"
                                                >

                                                    {role.name}

                                                </span>

                                            )
                                        )

                                    ) : (

                                        <span className="text-muted">

                                            No roles assigned

                                        </span>

                                    )}

                                </div>

                            </div>


                            <hr />


                            {/* Actions */}

                            <div className="d-flex gap-2 flex-wrap">

                                <Link
                                    to="/profile/edit"
                                    className="btn btn-primary"
                                >

                                    Edit Profile

                                </Link>


                                <Link
                                    to="/change-password"
                                    className="btn btn-outline-primary"
                                >

                                    Change Password

                                </Link>


                                <Link
                                    to="/settings"
                                    className="btn btn-outline-secondary"
                                >

                                    Account Settings

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Profile;
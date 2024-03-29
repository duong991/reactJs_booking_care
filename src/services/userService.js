import axios from "../axios";

const userService = {
    //------api for login account------
    handleLoginAPI(email, password) {
        return axios.post("/api/login", { email, password });
    },
    //------api for manage user--------
    getAllUser(type) {
        return axios.get(`/api/get-all-user?type=${type}`);
    },
    deleteUser(id) {
        return axios.delete("/api/delete-user", {
            data: {
                id,
            },
        });
    },
    createNewUser(data) {
        return axios.post("/api/create-new-user", data);
    },
    updateUser(data) {
        return axios.put("/api/update-user", data);
    },
    //-------api for manage user with redux----------
    getAllCodeServices(type) {
        return axios.get(`/api/all-code?type=${type}`);
    },
    //-------api for doctor -------------------
    getTopDoctorServices(limit) {
        return axios.get(`/api/top-doctor-home?limit=${limit}`);
    },
    getAllDoctorServices() {
        return axios.get("/api/get-all-doctors");
    },
    updateDetailDoctorService(data) {
        return axios.post("/api/update-detail-doctor", data);
    },
    getDetailDoctorById(id) {
        return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
    },
    getMarkdownByIdDoctor(id) {
        return axios.get(`/api/get-markdown-by-id-doctor?id=${id}`);
    },
    saveBulkScheduleDoctor(data) {
        return axios.post("/api/bulk-create-schedule", data);
    },
    getScheduleDoctorByDate(doctorId, date) {
        return axios.get(
            `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
        );
    },
    getExtraInfoDoctorById(doctorId) {
        return axios.get(
            `/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`
        );
    },
    getProfileDoctorById(doctorId) {
        return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
    },
    postPatientBookAppointment(data) {
        return axios.post("/api/patient-book-appointment", data);
    },

    postVerifyBookAppointment(data) {
        return axios.post("/api/verify-book-appointment", data);
    },
    postCancelBookAppointment(data) {
        return axios.post("/api/cancel-book-appointment", data);
    },
    getListPatientsForDoctor(doctorId, date) {
        return axios.get(
            `/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`
        );
    },
    sendRemedy(data) {
        return axios.post("/api/send-remedy", data);
    },
    // api quản lý chuyên khoa
    createNewSpecialty(data) {
        return axios.post("/api/create-new-specialty", data);
    },

    getAllSpecialty(type) {
        return axios.get(`/api/get-all-specialty?type=${type}`);
    },

    getDetailSpecialtyById(id, location) {
        return axios.get(
            `/api/get-detail-specialty-by-id?id=${id}&location=${location}`
        );
    },
    updateDetailSpecialtyById(data) {
        return axios.put(`/api/update-detail-specialty-by-id`, data);
    },
    deleteDetailSpecialtyById(id) {
        return axios.delete("/api/delete-specialty-by-id", {
            data: {
                id,
            },
        });
    },
    // api quản lý phòng khám
    createNewClinic(data) {
        return axios.post("/api/create-new-clinic", data);
    },

    getAllClinic(type) {
        return axios.get(`/api/get-all-clinic?type=${type}`);
    },

    getDetailClinicById(id) {
        return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
    },
    updateDetailClinicById(data) {
        return axios.put(`/api/update-detail-clinic-by-id`, data);
    },
    deleteDetailClinicById(id) {
        return axios.delete("/api/delete-clinic-by-id", {
            data: {
                id,
            },
        });
    },

    // api quản lý lịch hẹn bác sĩ
    getClinicIdForAdminHospital(id) {
        return axios.get(`/api/get-clinicId-for-admin-hospital?id=${id}`);
    },

    getAllDoctorByClinicId(clinicId) {
        return axios.get(
            `/api/get-all-doctor-by-clinicId?clinicId=${clinicId}`
        );
    },

    checkDoctors(data) {
        return axios.post("/api/check-doctors", data);
    },

    deleteSchedule(data) {
        return axios.post("/api/delete-schedule", data);
    },
};

export default userService;

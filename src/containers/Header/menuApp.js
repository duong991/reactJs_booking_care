export const adminMenu = [
    {
        // Quản lý người dùng
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.crud-redux",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
            },
        ],
    },
    {
        // Quản lý phòng Khám
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },
    {
        // Quản lý chuyên khoa
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
    {
        // Quản lý cẩm nang
        name: "menu.admin.handbook",
        menus: [
            {
                name: "menu.admin.manage-handbook",
                link: "/system/manage-handbook",
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: "menu.admin.manage-user",
        menus: [
            // Quản lý bệnh nhân khám bệnh
            {
                name: "menu.doctor.manage-patient",
                link: "/doctor/manage-patient",
            },
        ],
    },
];

export const AdminHospitalMenu = [
    {
        name: "menu.admin.manage-user",
        menus: [
            // Quản lý lịch khám bệnh bác sĩ
            {
                name: "menu.admin-hospital.manage-schedule",
                link: "/admin-hospital/manage-schedule",
            },
        ],
    },
];

export const adminMenu = [
    { // Quản lý ng dùng
        name: 'menu.addmin.manage-user', 
        menus: [
            {
                name: 'menu.addmin.crud', link: '/system/user-manage'
                
            },
            {
                name: 'menu.addmin.crud-redux', link: '/system/user-redux'
                
            },
            {
                name: 'menu.addmin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.addmin.manage-addmin', link: '/system/manage-addmin'
                
            // },
            { // Quản lý kế hoạch khám bệnh
              
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
                
            }     
            
        ]
    },
    { // Quản lý phòng khám
        name: 'menu.addmin.clinic', 
        menus: [
            {
                name: 'menu.addmin.manage-clinic', link: '/system/manage-clinic'
                
            },
           
            
        ]
    },
    { // Quản lý chuyên khoa
        name: 'menu.addmin.specialty', 
        menus: [
            {
                name: 'menu.addmin.manage-specialty', link: '/system/manage-specialty'
                
            },
           
            
        ]
    },
    { // Quản lý cẩm nang
        name: 'menu.addmin.handbook', 
        menus: [
            {
                name: 'menu.addmin.manage-handbook', link: '/system/manage-handbook'
                
            },
           
            
        ]
    },
];

export const doctorMenu = [
    { // Quản lý kế hoạch khám bệnh
        name: 'menu.addmin.manage-user', 
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
                
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
                
            }
        ],
    }     
]
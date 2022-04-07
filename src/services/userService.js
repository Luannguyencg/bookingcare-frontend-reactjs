import axios from "../axios"

export const handleLoginApi = (email, password) => {
    return axios.post('/api/login',{email, password})
}

export const getAllUser = (inputId) =>{
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

export const createNewUser = (data) =>{
    return axios.post(`/api/create-new-user`, data )
}
export const deleteUser = (userId)=>{
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId,
        }
    } )

}

export const editUser = (data) =>{
    return axios.put(`/api/edit-user`, data )
}

export const getAllCodeService = (typeInput) =>{
    return axios.get(`/api/allcode?type=${typeInput}` )
}

export const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export const getAllDoctor = () =>{
    return axios.get(`/api/all-doctor`)
}
export const saveDetailDoctorService = (data) =>{
    return axios.post(`/api/save-info-doctor`, data )
}

export const getDetailInfoDoctor = (id) =>{
    return axios.get(`/api/get-info-doctor-by-id?id=${id}`)
}
export const getInfoMakdownDoctor = (id) =>{
    return axios.get(`/api/get-info-markdown?id=${id}`)
}
export const editDetailInfoDoctor = (data) =>{
    return axios.put(`/api/edit-info-markdown`, data)
}
export const bulkCreateSchedule = (data) =>{
    return axios.post(`/api/bulk-create-schedule`, data)
}
export const getScheduleDoctorByDate = (date, doctorId) =>{
    return axios.get(`/api/schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
export const saveDoctorInfo = (data) =>{
    return axios.post(`/api/save-doctor-info`, data)
}
export const getDoctorInfoById = (doctorId) =>{
    return axios.get(`/api/doctor-info-by-id?id=${doctorId}`)
}
export const editDoctorInfo = (data) =>{
    return axios.put(`/api/edit-doctor-info`, data)
}
export const getProfileDoctorById = (doctorId) =>{
    return axios.get(`/api/profile-doctor-by-id?id=${doctorId}`)
}
export const postPatientBookAppointment = (data) =>{
    return axios.post(`/api/patient-book-appoinment`, data)
}
export const postVeryfyBookAppointment = (data) =>{
    return axios.post(`/api/veryfi-book-appoinment`, data)
}
export const createNewSpecialty = (data) =>{
    return axios.post(`/api/create-new-specialty`, data)
}
export const getAllSpecialty = (inputId) =>{
    return axios.get(`/api/get-all-specialty?id=${inputId}`)
}
export const updateSpecialty = (data) =>{
    return axios.put(`/api/update-edit-specialty`, data)
}
export const deleteSpecialty = (id) =>{
    return axios.delete(`/api/delete-specialty`, {
        data: {
            id: id,
        }
    } )
}
export const getDetailSpecialtyById = (data) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

export const createNewClinic = (data) =>{
    return axios.post(`/api/create-new-clinic`, data)
}
export const getAllClinic = (inputId) =>{
    return axios.get(`/api/get-all-clinic?id=${inputId}`)
}
export const updateClinic = (data) =>{
    return axios.put(`/api/update-edit-clinic`, data)
}
export const deleteClinic = (id) =>{
    return axios.delete(`/api/delete-clinic`, {
        data: {
            id: id,
        }
    } )
}

export const getDetailClinicById = (data) =>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
export const getListPatientforDoctor = (data) =>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
export const sendRemedy = (data) =>{
    return axios.post(`/api/send-remedy`, data)
}





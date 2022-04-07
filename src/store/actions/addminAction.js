import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import { userService } from '../../services';




// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await userService.getAllCodeService('GENDER')
            if (res && res.errCode === 0) {

                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())

        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED

})
//////////////
export const fetchPositionStart = () => {

    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await userService.getAllCodeService('POSITION')
            if (res && res.errCode === 0) {

                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart errr', e)
        }
    }
}
export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED

})
////////////////////////////////////////////////////////////////
export const fetchRoleStart = () => {

    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await userService.getAllCodeService('ROLE')

            if (res && res.errCode === 0) {

                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart errr', e)
        }
    }
}
export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED

})


///

export const createNewUser = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.createNewUser(data)
            if (res && res.errCode === 0) {
                toast.success("🦄 Create a new user succeed !")
                dispatch(createUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed())
                toast.error(`🦄 ${res.errMessage}`)
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('create errr', e)
        }
    }

}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,

})


export const fetchAllUserStart = () => {

    return async (dispatch, getState) => {

        try {

            let res = await userService.getAllUser('ALL')

            if (res && res.errCode === 0) {

                dispatch(fetchAllUserSuccess(res.user.reverse()))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart errr', e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})


///

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.deleteUser(userId)
            if (res && res.errCode === 0) {
                toast.success("🦄delete user succeed !")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
                toast.error(`🦄 ${res.errMessage}`)
            }
        } catch (e) {
            dispatch(deleteUserFailed())
            console.log('fetchRoleStart errr', e)
        }
    }

}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,

})

//

export const editUser = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.editUser(data)
            if (res && res.errCode === 0) {
                toast.success("update user succeed !")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(editUserFailed())
                toast.error(`🦄 ${res.errMessage}`)
            }
        } catch (e) {
            dispatch(editUserFailed())
            console.log('edit  errr', e)
        }
    }

}
export const editUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const editUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,

})

//

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getTopDoctorHomeService(10)

            if (res && res.errCode === 0) {

                dispatch(fetchTopDoctorSuccess(res.data))

            } else {
                dispatch(fetchTopDoctorFailed())

            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed())

        }
    }

}
export const fetchTopDoctorSuccess = (topDoctor) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    topDoctor
})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,

})


///

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getAllDoctor()

            if (res && res.errCode === 0) {

                dispatch(fetchAllDoctorSuccess(res.data))

            } else {
                dispatch(fetchTopDoctorFailed())

            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed())
            console.log('fetch all doctor  errr', e)
        }
    }

}
export const fetchAllDoctorSuccess = (allDoctor) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    allDoctor
})
export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,

})

///

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.saveDetailDoctorService(data)

            if (res && res.errCode === 0) {
                toast.success("🦄 save info succeed !")
                dispatch(saveDetailDoctorSuccess())


            } else {
                dispatch(saveDetailDoctorFailed())
                toast.error("🦄 save info err!")

            }
        } catch (e) {
            dispatch(saveDetailDoctorFailed())

        }
    }

}
export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

})
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,

})


///
export const getDetailDoctorById = (id) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getDetailInfoDoctor(id)

            if (res && res.errCode === 0) {
                dispatch(getDetailDoctorByIdSuccess(res.data))


            } else {
                dispatch(getDetailDoctorByIdFailed())

            }
        } catch (e) {
            dispatch(getDetailDoctorByIdFailed())
        }
    }

}
export const getDetailDoctorByIdSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_ID_SUCCESS,
    data
})
export const getDetailDoctorByIdFailed = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_ID_FAILED,

})
///
export const editDetailDoctor = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.editDetailInfoDoctor(data)

            if (res && res.errCode === 0) {
                toast.success("🦄 update info succeed ")
                dispatch(editDetailDoctorSuccess())


            } else {
                toast.error("🦄 update info err ")

                dispatch(editDetailDoctorFailed())

            }
        } catch (e) {
            dispatch(editDetailDoctorFailed())
        }
    }

}
export const editDetailDoctorSuccess = () => ({
    type: actionTypes.EDIT_DETAIL_DOCTOR_SUCCESS,

})
export const editDetailDoctorFailed = () => ({
    type: actionTypes.EDIT_DETAIL_DOCTOR_FAILED,

})


/////
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getAllCodeService('TIME')

            if (res && res.errCode === 0) {

                dispatch(fetchAllScheduleTimeSuccess(res.data))


            } else {

                dispatch(fetchAllScheduleTimeFailed())

            }
        } catch (e) {
            dispatch(fetchAllScheduleTimeFailed())
        }
    }

}
export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
    data
})
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,

})


////////////////////////////////////////////////////////////////
export const bulkCreateSchedule = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.bulkCreateSchedule(data)

            if (res && res.errCode === 0) {
                toast.success("order success")
                dispatch(bulkCreateScheduleSuccess())


            } else {

                dispatch(bulkCreateScheduleFailed())

            }
        } catch (e) {
            dispatch(bulkCreateScheduleFailed())
        }
    }

}
export const bulkCreateScheduleSuccess = () => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_SUCCESS,

})
export const bulkCreateScheduleFailed = () => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_FAILED,

})
////////////////////////////////////////////////////////////////
export const getScheduleDoctorByDate = (date, doctorId) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getScheduleDoctorByDate(date, doctorId)

            if (res && res.errCode === 0) {
                dispatch(getScheduleDoctorByDateSuccess(res.data))


            } else {

                dispatch(getScheduleDoctorByDateFailed())

            }
        } catch (e) {
            dispatch(getScheduleDoctorByDateFailed())
        }
    }

}
export const getScheduleDoctorByDateSuccess = (data) => ({
    type: actionTypes.FETCH_SCHEDULE_BY_DATE_SUCCESS,
    data
})
export const getScheduleDoctorByDateFailed = () => ({
    type: actionTypes.FETCH_SCHEDULE_BY_DATE_FAILED,

})
////////////////////////////////////////////////////////////////
export const getRequireDoctorInfo = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START })
            let resPrice = await userService.getAllCodeService('PRICE')
            let resPayment = await userService.getAllCodeService('PAYMENT')
            let resProvince = await userService.getAllCodeService('PROVINCE')
            let resSpecialty = await userService.getAllSpecialty('ALL')
            let resClinic = await userService.getAllClinic('ALL')

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0&& 
                resClinic && resClinic.errCode === 0
            ) {

                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getRequireDoctorInfoSuccess(data))


            } else {

                dispatch(getRequireDoctorInfoFailed())

            }
        } catch (e) {
            dispatch(getRequireDoctorInfoFailed())
        }
    }

}
export const getRequireDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    data
})
export const getRequireDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED,

})

////////////////////////////////////////////////////////////////
export const saveDoctorInfo = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.saveDoctorInfo(data)


            if (res) {
                toast.success('🦄 create info succeed')
                dispatch(saveDoctorInfoSuccess())
            } else {
                dispatch(saveDoctorInfoFailed())
            }
        } catch (e) {
            dispatch(saveDoctorInfoFailed())
        }
    }

}
export const saveDoctorInfoSuccess = () => ({
    type: actionTypes.SAVE_DOCTOR_INFO_SUCCESS,

})
export const saveDoctorInfoFailed = () => ({
    type: actionTypes.SAVE_DOCTOR_INFO_FAILED,

})
////////////////////////////////////////////////////////////////
export const getDoctorInfoById = (doctorId) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getDoctorInfoById(doctorId)


            if (res) {

                dispatch(getDoctorInfoByIdSuccess(res.data))
            } else {
                dispatch(getDoctorInfoByIdFailed())
            }
        } catch (e) {
            dispatch(getDoctorInfoByIdFailed())
        }
    }

}
export const getDoctorInfoByIdSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
    data
})
export const getDoctorInfoByIdFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FAILED,

})

////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
export const getProfileDoctorById = (doctorId) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getProfileDoctorById(doctorId)

            if (res && res.errCode === 0) {

                dispatch(getProfileDoctorByIdSuccess(res.data))
            } else {
                dispatch(getProfileDoctorByIdFailed())
            }
        } catch (e) {
            dispatch(getProfileDoctorByIdFailed())
        }
    }

}
export const getProfileDoctorByIdSuccess = (data) => ({
    type: actionTypes.FETCH_PROFILE_DOCTOR_SUCCESS,
    data
})
export const getProfileDoctorByIdFailed = () => ({
    type: actionTypes.FETCH_PROFILE_DOCTOR_FAILED,

})

////////////////////////////////////////////////////////////////
export const getAllSpecialty = () => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getAllSpecialty('ALL')

            if (res && res.errCode === 0) {

                dispatch(getAllSpecialtySuccess(res.data))
            } else {
                dispatch(getAllSpecialtyFailed())
            }
        } catch (e) {
            dispatch(getAllSpecialtyFailed())
        }
    }

}
export const getAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data
})
export const getAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,

})


////////////////////////////////////////////////////////////////
export const getDetailSpecialtyById = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getDetailSpecialtyById(data)
            if (res && res.errCode === 0) {

                dispatch(getDetailSpecialtyByIdSuccess(res.data))
            } else {
                dispatch(getDetailSpecialtyByIdFailed())
            }
        } catch (e) {
            dispatch(getDetailSpecialtyByIdFailed())
        }
    }

}
export const getDetailSpecialtyByIdSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_SPECIALTY_SUCCESS,
    data
})
export const getDetailSpecialtyByIdFailed = () => ({
    type: actionTypes.FETCH_DETAIL_SPECIALTY_FAILED,

})


//////
export const createNewClinic = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.createNewClinic(data)
            if (res && res.errCode === 0) {
                toast.success("Create clinic success")
                
                dispatch(createNewClinicSuccess())
            } else {
                toast.error("Create clinic err")
                dispatch(createNewClinicFailed())
            }
        } catch (e) {
            dispatch(createNewClinicFailed())
        }
    }

}
export const createNewClinicSuccess = () => ({
    type: actionTypes.CREATE_CLINIC_SUCCESS,

})
export const createNewClinicFailed = () => ({
    type: actionTypes.CREATE_CLINIC_FAILED,

})


////////////////////////////////////////////////////////////////
export const getAllClinic = () => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getAllClinic('ALL')
            console.log('check all clinic', res)
            if (res && res.errCode === 0) {
                dispatch(getAllClinicSuccess(res.data))
            } else {
                dispatch(getAllClinicFailed())
            }
        } catch (e) {
            dispatch(getAllClinicFailed())
        }
    }

}
export const getAllClinicSuccess = (data) => ({
    type: actionTypes.GET_ALL_CLINIC_SUCCESS,
    data
})
export const getAllClinicFailed = () => ({
    type: actionTypes.GET_ALL_CLINIC_FAILED,

})



// start / doing  / end

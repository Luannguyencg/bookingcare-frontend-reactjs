import React, { Component } from 'react';
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import { userService } from '../../../services'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { lang } from 'moment';
import { toast } from 'react-toastify';


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);






class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: '',
            allDoctor: [],
            isHasData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getRequireDoctorInfo()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                allDoctor: dataSelect
            })
        }
        if (prevProps.listPrice !== this.props.listPrice &&
            prevProps.listPayment !== this.props.listPayment &&
            prevProps.listProvince !== this.props.listProvince &&
            prevProps.listSpecialty !== this.props.listSpecialty &&
            prevProps.listClinic !== this.props.listClinic
        ) {
            let dataSelectPrice = this.buildDataInputSelect(this.props.listPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(this.props.listPayment)
            let dataSelectProvince = this.buildDataInputSelect(this.props.listProvince)
            let dataSelectSpecialty = this.buildDataInputSelect(this.props.listSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(this.props.listClinic, 'CLINIC')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let dataSelectPrice = this.buildDataInputSelect(this.props.listPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(this.props.listPayment)
            let dataSelectProvince = this.buildDataInputSelect(this.props.listProvince)
            let dataSelectSpecialty = this.buildDataInputSelect(this.props.listSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(this.props.listClinic, 'CLINIC')
            if (this.state.selectedDoctor && this.props.allDoctor.length > 0) {
                let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
                let dataSelectPrice = this.buildDataInputSelect(this.props.listPrice, 'PRICE')
                let dataSelectPayment = this.buildDataInputSelect(this.props.listPayment)
                let dataSelectProvince = this.buildDataInputSelect(this.props.listProvince)
                let dataSelectSpecialty = this.buildDataInputSelect(this.props.listSpecialty, 'SPECIALTY')
                let dataSelectClinic = this.buildDataInputSelect(this.props.listClinic, 'CLINIC')
                this.props.getDoctorInfoById(this.state.selectedDoctor.value)
                this.props.getDetailDoctorById(this.state.selectedDoctor.value)

                let { doctorInfo, language, detailDoctor } = this.props

                let selectedDoctor = {
                    label: language === LANGUAGES.VI ? `${detailDoctor.lastName} ${detailDoctor.firstName}` : `${detailDoctor.firstName} ${detailDoctor.lastName} `,
                    value: detailDoctor.id
                }

                let selectedPrice = {
                    label: language === LANGUAGES.EN ? `${doctorInfo.priceData.valueEn} USD` : doctorInfo.priceData.valueVi,
                    value: doctorInfo.priceId
                }
                let selectedProvince = {
                    label: language === LANGUAGES.EN ? doctorInfo.provinceData.valueEn : doctorInfo.provinceData.valueVi,
                    value: doctorInfo.provinceId
                }
                let selectedPayment = {
                    label: language === LANGUAGES.EN ? doctorInfo.paymentData.valueEn : doctorInfo.paymentData.valueVi,
                    value: doctorInfo.paymentId
                }
                this.setState({
                    allDoctor: dataSelect,
                    listPrice: dataSelectPrice,
                    listPayment: dataSelectPayment,
                    listProvince: dataSelectProvince,
                    listSpecialty: dataSelectSpecialty,
                    listClinic: dataSelectClinic,
                    selectedDoctor: selectedDoctor,

                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                    clinicName: doctorInfo.clinicName,
                    clinicAddress: doctorInfo.clinicAddress,
                    note: doctorInfo.note,
                })
            }

            this.setState({
                allDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })



        }


    }

    buildDataInputSelect = (data, type) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            if (type === 'USERS') {

                data.map((item, index) => {

                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = ` ${item.firstName} ${item.lastName}`
                    object.label = LANGUAGES.VI === language ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = `${item.valueEn} USD`
                    object.label = LANGUAGES.VI === language ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })


            }
            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {}

                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                data.map((item, index) => {
                    let object = {}

                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            else {
                /// povince v.v
                data.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = `${item.valueEn}`
                    object.label = LANGUAGES.VI === language ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }




        }
        return result
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }

    handleChangeSelectDoctor = async (selectedDoctor) => {

        this.setState({ selectedDoctor });
        let markdown = await userService.getInfoMakdownDoctor(selectedDoctor.value)
        await this.props.getDoctorInfoById(selectedDoctor.value)


        let { language } = this.props
        let { doctorInfo } = this.props
        console.log('check props', doctorInfo)
        if (doctorInfo && Object.keys(doctorInfo).length > 0) {
            let selectedPrice = {}
            let selectedProvince = {}
            let selectedPayment = {}
            let selectedSpecialty = {}
            let selectedClinic = {}
            if (doctorInfo.priceData && doctorInfo.priceData.valueVi) {
                selectedPrice = {
                    label: language === LANGUAGES.VI ? doctorInfo.priceData.valueVi : `${doctorInfo.priceData.valueEn} USD`,
                    value: doctorInfo.priceId
                }
            }
            if (doctorInfo.provinceId && doctorInfo.provinceData.valueVi) {
                selectedProvince = {
                    label: language === LANGUAGES.VI ? doctorInfo.provinceData.valueVi : doctorInfo.provinceData.valueEn,
                    value: doctorInfo.provinceId
                }
            }
            if (doctorInfo.paymentData && doctorInfo.paymentData.valueVi) {
                selectedPayment = {
                    label: language === LANGUAGES.VI ? doctorInfo.paymentData.valueVi : doctorInfo.paymentData.valueEn,
                    value: doctorInfo.paymentId
                }
            }
            if (doctorInfo.specialtyData && doctorInfo.specialtyData.name) {
                selectedSpecialty = {
                    label: doctorInfo.specialtyData.name,
                    value: doctorInfo.specialtyData.id
                }
            }
            if (doctorInfo.clinicData && doctorInfo.clinicData.name) {
                selectedClinic = {
                    label: doctorInfo.clinicData.name,
                    value: doctorInfo.clinicData.id
                }
            }
            this.setState({
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                clinicName: doctorInfo.clinicName,
                clinicAddress: doctorInfo.clinicAddress,
                note: doctorInfo.note,
            })


        } else {
            this.setState({
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                clinicName: '',
                clinicAddress: '',
                note: '',
            })
        }
        if (Object.keys(markdown.data).length > 0 && markdown.data) {

            this.setState({
                contentMarkdown: markdown.data.contentMarkdown,
                contentHTML: markdown.data.contentHTML,
                description: markdown.data.description,


                isHasData: true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',

                isHasData: false,
            }
            )

        }



    };
    handleChangeSelectPrice = (selectedPrice) => {
        this.setState({ selectedPrice })
    }
    handleChangeSelectPayment = (selectedPayment) => {
        this.setState({ selectedPayment })
    }
    handleChangeSelectProvince = (selectedProvince) => {
        this.setState({ selectedProvince })
    }
    handleChangeSelectProvince = (selectedProvince) => {
        this.setState({ selectedProvince })
    }
    handleChangeSelectSpecialty = (selectedSpecialty) => {
        this.setState({ selectedSpecialty })
    }
    handleChangeSelectClinic = (selectedClinic) => {
        this.setState({ selectedClinic })
    }



    handleOnchangeDesc = (e) => {
        let updateValue = { ...this.state }
        updateValue[e.target.name] = e.target.value
        this.setState(updateValue)
    }


    handleSaveMarkdown = async () => {
        let { contentHTML, contentMarkdown,
            description, clinicName,
            clinicAddress, selectedPayment,
            selectedProvince, selectedPrice,
            selectedSpecialty, selectedClinic } = this.state

        if (!contentHTML || !contentMarkdown ||
            !description || !clinicName ||
            !clinicAddress || !selectedPayment ||
            !selectedProvince || !selectedPrice||
            !selectedSpecialty || !selectedClinic
            ) {
            toast.error('Invalid ! Please fill in all the information before saving')
        } else {

            if (this.state.isHasData === true) {
                await this.props.editDetailDoctor({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value,
                })

                await this.props.saveDoctorInfo({
                    doctorId: this.state.selectedDoctor.value,
                    priceId: this.state.selectedPrice.value,
                    provinceId: this.state.selectedProvince.value,
                    paymentId: this.state.selectedPayment.value,
                    clinicAddress: this.state.clinicAddress,
                    clinicName: this.state.clinicName,
                    specialtyId: this.state.selectedSpecialty.value,
                    clinicId: this.state.selectedClinic.value,
                    note: this.state.note
                })

            } else {

                await this.props.saveDetailDoctor({
                    contentHTML: this.state.contentHTML,
                    contentMarkdown: this.state.contentMarkdown,
                    description: this.state.description,
                    doctorId: this.state.selectedDoctor.value,
                    priceId: this.state.selectedPrice.value,
                    provinceId: this.state.selectedProvince.value,
                    paymentId: this.state.selectedPayment.value,
                    clinicAddress: this.state.clinicAddress,
                    clinicName: this.state.clinicName,
                    specialtyId: this.state.selectedSpecialty.value,
                    clinicId: this.state.selectedClinic.value,
                    note: this.state.note
                })
                await this.props.saveDoctorInfo({
                    doctorId: this.state.selectedDoctor.value,
                    priceId: this.state.selectedPrice.value,
                    provinceId: this.state.selectedProvince.value,
                    paymentId: this.state.selectedPayment.value,
                    clinicAddress: this.state.clinicAddress,
                    clinicName: this.state.clinicName,
                    specialtyId: this.state.selectedSpecialty.value,
                    clinicId: this.state.selectedClinic.value,
                    note: this.state.note
                })


            }
        }

    }
    render() {

        let { isHasData } = this.state
        let { language } = this.props
        return (

            <div className="manage-doctor-container container">

                <h1 className="manage-doctor__title"><FormattedMessage id="addmin.manage-doctor.title" /></h1>

                <div className="more-info row ">
                    <div className="col-lg-5 col-md-5 col-sm-5">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.chosse-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            name='selectedDoctor'
                            onChange={this.handleChangeSelectDoctor}
                            options={this.state.allDoctor}
                            className="more-info__input"
                            placeholder={<FormattedMessage id="addmin.manage-doctor.chosse-doctor" />}
                        />
                    </div>

                    <div className="col-lg-7 col-md-7 col-sm-7">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.introduction" />
                        </label>
                        <textarea
                            className="form-control more-info__input"
                            name="description"
                            onChange={(e) => this.handleOnchangeDesc(e)}
                            value={this.state.description}
                        >
                        </textarea>

                    </div>
                </div>
                <div className="more-info row">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectPrice}
                            options={this.state.listPrice}
                            className="more-info__input"
                            placeholder={<FormattedMessage id="addmin.manage-doctor.price" />}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.payment-method" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectPayment}
                            options={this.state.listPayment}
                            className="more-info__input"
                            placeholder={<FormattedMessage id="addmin.manage-doctor.payment-method" />}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.choose-province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectProvince}
                            options={this.state.listProvince}
                            className="more-info__input"
                            placeholder={<FormattedMessage id="addmin.manage-doctor.choose-province" />}
                        />
                    </div>
                </div>
                <div className="more-info row">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectSpecialty}
                            options={this.state.listSpecialty}
                            className="more-info__input"
                            placeholder={<FormattedMessage id="addmin.manage-doctor.specialty" />}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectClinic}
                            options={this.state.listClinic}
                            className="more-info__input"
                            placeholder={<FormattedMessage id="addmin.manage-doctor.clinic" />}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.clinic-name" />
                        </label>
                        <input
                            className="form-control more-info__input"
                            name="clinicName"
                            onChange={(e) => this.handleOnchangeDesc(e)}
                            value={this.state.clinicName}
                            placeholder={language === LANGUAGES.VI ? 'Tên phòng khám' : 'Clinic name'}
                        />

                    </div>
                </div>
                <div className="more-info row">

                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.clinic-address" />
                        </label>
                        <input
                            className="form-control more-info__input"
                            name="clinicAddress"
                            onChange={(e) => this.handleOnchangeDesc(e)}
                            value={this.state.clinicAddress}
                            placeholder={language === LANGUAGES.VI ? 'Địa chỉ phòng khám' : 'Clinic address'}
                        />

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <label className="title-input">
                            <FormattedMessage id="addmin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control more-info__input"
                            name="note"
                            onChange={(e) => this.handleOnchangeDesc(e)}
                            value={this.state.note}
                            placeholder={language === LANGUAGES.VI ? 'Ghi chú!' : 'Note'}
                        />

                    </div>
                </div>


                <div className="manage-doctor__editor">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={isHasData === true ? "save-content-markdown__btn" : "create-content-markdown__btn"}
                    onClick={() => this.handleSaveMarkdown()}
                >
                    {isHasData === true ? <FormattedMessage id="addmin.manage-doctor.save" /> : <FormattedMessage id="addmin.manage-doctor.add" />}
                </button>
            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.addmin.users,
        allDoctor: state.addmin.allDoctor,
        language: state.app.language,
        listPrice: state.addmin.listPrice,
        listPayment: state.addmin.listPayment,
        listProvince: state.addmin.listProvince,
        listSpecialty: state.addmin.listSpecialty,
        listClinic: state.addmin.listClinic,
        doctorInfo: state.addmin.doctorInfo,
        detailDoctor: state.addmin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctorById: (id) => dispatch(actions.getDetailDoctorById(id)),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        editDetailDoctor: (data) => dispatch(actions.editDetailDoctor(data)),
        getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
        saveDoctorInfo: (data) => dispatch(actions.saveDoctorInfo(data)),
        getDoctorInfoById: (doctorId) => dispatch(actions.getDoctorInfoById(doctorId)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

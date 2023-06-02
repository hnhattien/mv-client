import { Checkbox, Form, Input, Modal, notification } from 'antd'
import requester from 'lib/api/requester';
import { useMergeState } from 'lib/hook';
import { concat, get, indexOf, isArray, isEmpty, isNil, remove, union } from 'lodash';
import React, { useEffect, useState } from 'react'

export default function ReportModal({ visible, filmId, t, filmTitle, onClose }) {
    const [checkboxValues, setCheckboxValues] = useState([]);

    const options = [
        {
            label: t('video-not-play'),
            value: 'VIDEO_ERROR',
        },
        {
            label: t('wrong-film'),
            value: 'WRONG_FILM',
        },
        {
            label: t('slow-video-loading'),
            value: 'SLOW_VIDEO_LOADING',
        },
        {
            label: t('subtitle'),
            value: 'SUBTITLE',
        },
        {
            label: t('audio-error'),
            value: 'AUDIO_ERROR',
        },
        {
            label: t('film-lag'),
            value: 'FILM_LAG',
        },
    ];


    useEffect(() => {
        console.log(checkboxValues);
    }, [JSON.stringify(checkboxValues)])

    const [ form ] = Form.useForm();
    const onCheckboxChange = (values) => {
        console.log(values);
        setCheckboxValues(values)
    }
    const onSubmit = async (values) => {
        try{
            if(isEmpty(form.getFieldValue('message')) && !checkboxValues.length){
               notification.error({message: t('submit-error')})
            }else{
                const reuslt = await requester.post('/report', {...values, reportTypes: checkboxValues, filmId});
                notification.success({message: t('submit-success'), type: 'success'});
            }
        }
        catch(err){
            console.log(err);
        }

    }
    return (
        <Modal class='report-modal' okText={t('submit')} wrapClassName='report-modal' onCancel={onClose} onOk={() => {form.submit()}} visible={visible} title={t('report-film')}>
            <h4 className='text-2xl text-white'>{filmTitle}</h4>
            <Form name='report-form' style={{marginTop: '20px'}} onFinish={onSubmit} form={form}>
                <Form.Item name='reportTypes'>
                    <div className='report'>
                        <Checkbox.Group options={options} onChange={onCheckboxChange} />
                    </div>
                </Form.Item>

                <Form.Item name='message'>
                    <div className='message-input'>
                        <Input.TextArea rows={4} placeholder={t('report-message-placeholder')}></Input.TextArea>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

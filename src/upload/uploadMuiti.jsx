import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Upload } from "antd";
import { callUploadBookImg } from "../service/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { isUploadMutiple } from "../redux/upload/action";

const UploadMutiFiles = () => {
    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [dataThumbnail, setDataThumbnail] = useState([])
    const [dataSlider, setDataSlider] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const dispatch = useDispatch()
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file, fileList) => {

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size < 5000000;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;

    };

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file);
        if (res.statusCode === 201) {
            setDataSlider((dataSlider) => [...dataSlider, {
                name: res.data.filesName[0],
                uid: file.uid
            }]
            )
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');

        }


    };
    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== file.uid);
            setDataSlider(newSlider);
            dispatch(isUploadMutiple())
        }
    }

    const handlePreview = async (file) => {
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };
    dispatch(isUploadMutiple(dataSlider))
    return (<>
        <Upload
            multiple
            name="slider"
            listType="picture-card"
            className="avatar-uploader"
            customRequest={handleUploadFileSlider}
            beforeUpload={beforeUpload}
            onChange={(info) => handleChange(info, 'slider')}
            onRemove={(file) => handleRemoveFile(file, "slider")}
            onPreview={handlePreview}
        >
            <div>
                {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        </Upload>
    </>)
}
export default UploadMutiFiles
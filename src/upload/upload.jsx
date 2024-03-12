import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";
import { callUploadBookImg } from "../service/api";
import { useDispatch } from "react-redux";
import { isUpload } from "../redux/upload/action";
import ImgCrop from "antd-img-crop";


const UploadFile = () => {
    const [loading, setLoading] = useState(false);
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState([])
    const [dataThumbnail, setDataThumbnail] = useState([])
    const [dataSlider, setDataSlider] = useState([])
    const [slider, setSlider] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const dispatch = useDispatch()
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {

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


    const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
        const res = await callUploadBookImg(file)
        if (res.statusCode === 201) {
            console.log(res)
            dispatch(isUpload(res.data.filesName))
            setDataThumbnail({
                name: res.data.filesName,
                uid: file.uid
            })
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }

    };
    const handleRemoveFile = (file, type) => {
        if (type === 'thumbnail') {
            dispatch(isUpload())
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== file.uid);
            setDataSlider(newSlider);
        }
    }

    const handlePreview = async (file) => {
        getBase64(file.originFileObj, (url) => {
            setPreviewImage(url);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        });
    };
    return (<><ImgCrop>
        <Upload
            name="thumbnail"
            listType="picture-card"
            className="avatar-uploader"
            maxCount={1}
            multiple={false}
            customRequest={handleUploadFileThumbnail}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onRemove={(file) => handleRemoveFile(file, "thumbnail")}
            onPreview={handlePreview}
        >
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        </Upload>
    </ImgCrop></>)

}
export default UploadFile
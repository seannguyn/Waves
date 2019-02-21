import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageFiles:[],
            uploading: false
        }
    }

    onDrop(imageFile) {
        console.log(imageFile);

        this.setState({uploading: true});

        let formData = new FormData();

        const config = {
            header: {
                'content-type': 'multipart/form-data',
            }
        }

        formData.append('imageFile',imageFile[0]);

        this.setState({uploading: true})

        axios.post('/api/product/uploadImage',formData,config)
        .then((response)=> {
            this.setState({
                uploading: false,
                imageFiles: [
                    ...this.state.imageFiles,
                    response.data
                ]
            }, () => {
                this.props.handleImageUpload(this.state.imageFiles);
            })
        })
        .catch(error => console.log(error));
        
    }

    removeImage(public_id){
        console.log(public_id);
        axios.get(`/api/product/removeImage/${public_id}`)
        .then((response) => {
            const newImages = this.state.imageFiles.filter((item) => {return item.public_id !== public_id})
            this.setState({
                imageFiles: newImages
            },() => {
                this.props.handleImageUpload(this.state.imageFiles)
            })
        })
        .catch((error) => console.log(error));
    }

    showImages = () => (
        this.state.imageFiles.map((item) => (
                <div 
                    className="dropzone_box" 
                    key={item.public_id}
                    onClick={this.removeImage.bind(this, item.public_id)}
                >
                        <div className="wrap" style={{background:`url(${item.url}) no-repeat`}}>
                                
                        </div>
                </div>
            )
        )
    )

    static getDerivedStateFromProps(props, state) {
        if (props.reset === true) {
            return state = {
                imageFiles:[]
            }
        }
        return null;
    }   

    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone
                            onDrop={this.onDrop.bind(this)}
                            className="dropzone_box"
                        >   
                            <div className="wrap" >
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </div>
                            
                        </Dropzone>
                        {this.showImages()}
                        {
                            this.state.uploading ? (
                            <div className="dropzone_box" style={{textAlign:'center', paddingTop:"60px"}}>
                                <CircularProgress/>
                            </div>)
                            : null
                        }
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default FileUpload;

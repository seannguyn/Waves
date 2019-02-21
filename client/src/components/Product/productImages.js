import React, { Component } from 'react'
import ImageLightBox from '../Form/lightbox';

class ProductImages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            lightBox: false
        }
    }
    
    renderPrimaryImage = (images) => {
        if(images.length > 0){
            return images[0].url
        }else{
            return `/images/image_not_availble.png`
        }
    }

    renderSecondaryImage = () => (

        this.props.images.map((item,i)=>(
            i > 0 ? 
                <div
                    key={i}
                    onClick={()=> this.handleLightBox(i)}
                    className="thumb"
                    style={{background: `url(${item.url}) no-repeat`}}
                ></div> 
                : null
        ))
    )

    handleLightBox = (position) => {        
        this.setState({
            lightBox: true,
            position: position
        })
    }

    closeLightBox() {
        this.setState({
            lightBox: false
        })
    }

    render() {
        const {images} = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{background:`url(${this.renderPrimaryImage(images)}) no-repeat`}} 
                        onClick={()=> this.handleLightBox(0)}
                    >
                    </div>
                </div>
                <div className="main_thumbs">
                    {this.renderSecondaryImage()}
                </div>
                {
                    this.state.lightBox === true ?
                        (<ImageLightBox
                            images={images}
                            position={this.state.position}
                            onClose={this.closeLightBox.bind(this)}
                        />)
                    :null
                }
            </div>
        );
    }
}

export default ProductImages;

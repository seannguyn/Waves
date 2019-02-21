import React, { Component } from 'react'
import Lightbox from 'react-images';

class ImageLightBox extends Component {

    state = {
        images: [],
        lightboxIsOpen: true,
        currentImage: this.props.position
    }

    static getDerivedStateFromProps(props, state) {
        if (props.images.length > 0) {
            const images = [];
            props.images.forEach(element=>{
                images.push({src:`${element.url}`})
            });
            return state = {
                images
            }
        }
        return false;
    }

    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage -1
        })
    }

    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage +1
        })
    }

    closeLightbox = () => {
        this.props.onClose();
    }

    render() {
                
        return (
            <Lightbox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={()=> this.gotoPrevious()}
                onClickNext={()=> this.gotoNext()}
                onClose={()=>this.closeLightbox()}
            />
        )
    }
}

export default ImageLightBox;

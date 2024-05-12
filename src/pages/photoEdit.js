import React, { useEffect, useState } from 'react';
import FirebaseStorage from '../Componenets/firebaseStorage';
import 'react-image-crop/dist/ReactCrop.css';
import { getStorage } from 'firebase/storage';

function PhotoEdit() {
    const [editFile, setEditFile] = useState({});
    const [imageSrc, setImageSrc] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [fileName, setFileName] = useState('');
    const [draggingEnabled, setDraggingEnabled] = useState(false);
    const storage = getStorage();
    const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 100, height: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [dragDirection, setDragDirection] = useState('');
    const [textOverlay, setTextOverlay] = useState([]); // State to store text overlay details

    useEffect(() => {
        console.log(editFile, "editFile")
    }, [editFile]);

    const handleRotateLeft = async () => {
        setRotation(rotation - 90);
        await handleCroped({});
    };

    const handleRotateRight = async () => {
        setRotation(rotation + 90);
        await handleCroped({});
    };

    const downloadCroppedImage = (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cropped_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileName(e.target.files[0].name);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImageSrc(event.target.result);
            setPreviewSrc(event.target.result);

            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let initialWidth = img.width;
                let initialHeight = img.height;

                if (initialWidth > 500) {
                    initialWidth = 500;
                    initialHeight = (500 / img.width) * img.height;
                }
                if (initialHeight > 500) {
                    initialHeight = 500;
                    initialWidth = (500 / img.height) * img.width;
                }

                setCropBox({
                    x: 1,
                    y: 1,
                    width: initialWidth - 50,
                    height: initialHeight - 50,
                });
            };
        };
        reader.readAsDataURL(file);
    };

    const toggleDragging = () => {
        setDraggingEnabled(!draggingEnabled);
    };

    const handleMouseDown = (e, direction) => {
        if (draggingEnabled === false) {
            setIsDragging(true);
            setStartX(e.clientX);
            setStartY(e.clientY);
            setDragDirection(direction);
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && draggingEnabled === false) {
            const imageRect = e.target.getBoundingClientRect();
            const maxX = imageRect.width - cropBox.width;
            const maxY = imageRect.height - cropBox.height;
            const offsetX = e.clientX - startX;
            const offsetY = e.clientY - startY;

            let newX = cropBox.x;
            let newY = cropBox.y;
            let newWidth = cropBox.width;
            let newHeight = cropBox.height;

            if (dragDirection.includes('left')) {
                newX += offsetX;
                newWidth -= offsetX;
            }
            if (dragDirection.includes('top')) {
                newY += offsetY;
                newHeight -= offsetY;
            }
            if (dragDirection.includes('right')) {
                newWidth += offsetX;
            }
            if (dragDirection.includes('bottom')) {
                newHeight += offsetY;
            }

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            newWidth = Math.max(0, Math.min(newWidth, imageRect.width - newX));
            newHeight = Math.max(0, Math.min(newHeight, imageRect.height - newY));

            setCropBox({ x: newX, y: newY, width: newWidth, height: newHeight });
            setStartX(e.clientX);
            setStartY(e.clientY);
        }
    };

    const handleMouseUp = () => {
        if (draggingEnabled === false) {
            setIsDragging(false);
            setDragDirection('');
        }
    };

    const handleCroped = async (cropObj) => {
        const croppedImage = await getImage(imageSrc, cropObj, rotation, textOverlay);
        const imageUrl = URL.createObjectURL(croppedImage);
        if (cropObj == {}) {
            setPreviewSrc(imageUrl);
        }
    };

    const getImage = async (imageSrc, cropVal, rotation, textOverlay) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const width = cropVal.width || image.width;
                const height = cropVal.height || image.height;
                const x = cropVal.x || 0;
                const y = cropVal.y || 0;
                canvas.width = width;
                canvas.height = height;

                // Draw the image
                ctx.translate(width / 2, height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.drawImage(
                    image,
                    x,
                    y,
                    width,
                    height,
                    -width / 2,
                    -height / 2,
                    width,
                    height
                );

                // Draw text overlay if exists
                if (textOverlay) {
                    ctx.font = `${textOverlay.fontSize}px Arial`;
                    ctx.fillStyle = textOverlay.color;
                    ctx.textAlign = 'center'; // Center the text horizontally
                    ctx.textBaseline = 'middle'; // Center the text vertically
                    ctx.fillText(textOverlay.text, textOverlay.x, textOverlay.y);
                }

                canvas.toBlob((blob) => {
                    downloadCroppedImage(blob);
                    resolve(blob);
                }, 'image/png');
            };
            image.onerror = (error) => reject(error);
        });
    };

    // const handleTextAddition = () => {
    //     // For demonstration purposes, I'll add a simple text overlay at the center of the crop box
    //     setTextOverlay({
    //         ...textOverlay,
    //         text: textOverlay.text,
    //         fontSize: textOverlay.fontSize,
    //         color: textOverlay.color,
    //         x: cropBox.x + cropBox.width / 2,
    //         y: cropBox.y + cropBox.height / 2,
    //     });
    // };

    const handleTextAddition = () => {
        // For demonstration purposes, I'll add a simple text overlay at the center of the crop box
        const newTextOverlay = [{
            text: textOverlay.text,
            x: cropBox.x + cropBox.width / 2,
            y: cropBox.y + cropBox.height / 2,
            fontSize: textOverlay.fontSize,
            color: textOverlay.color
        }];
        newTextOverlay.push(textOverlay)
        console.log( textOverlay,"textOverlay")
        setTextOverlay(newTextOverlay);
    };

    // const handleImageAddition = () => {
    //     // For demonstration purposes, I'll add a sample image overlay at the center of the crop box
    //     const newImageOverlay = {
    //         src: 'image_url_here',
    //         x: cropBox.x + cropBox.width / 2,
    //         y: cropBox.y + cropBox.height / 2,
    //         width: 50, // Set your desired width
    //         height: 50 // Set your desired height
    //     };
    //     setImageOverlays([...imageOverlays, newImageOverlay]);
    // };

    // const handleOverlayClick = (index, type) => {
    //     if (type === 'text') {
    //         // Handle text overlay click
    //         const newTextOverlays = [...textOverlays];
    //         // Modify textOverlay properties based on your requirements
    //         // newTextOverlays[index].text = 'Updated Text';
    //         setTextOverlays(newTextOverlays);
    //     } else if (type === 'image') {
    //         // Handle image overlay click
    //         const newImageOverlays = [...imageOverlays];
    //         // Modify imageOverlay properties based on your requirements
    //         // newImageOverlays[index].src = 'updated_image_url';
    //         setImageOverlays(newImageOverlays);
    //     }
    // };

    return (
        <div className="row mt-2 w-auto" style={{ height: "34rem" }}>
            <div style={{ border: "1px solid blue", height: "34rem", overflow: 'scroll' }} className='col-sm-2 text-white border-1 border-primary'>
                <FirebaseStorage setEditFile={setEditFile} />
            </div>
            <div className='col-sm-10 text-primary' style={{ border: "1px solid blue" }}>
                <div className="drawer-content ">
                    <div className="container" style={{
                        width: '16.8rem',
                        height: '8rem',
                        zIndex: 1,
                        top: '0rem',
                        left: '1.0rem',
                    }}>
                        <div className="d-flex bg-dark   ">
                            <div className="upload-btn-wrapper   d-flex ">
                                <button className="button" >{fileName ? fileName : 'Drop A New File'} </button>
                                <input type="file" name="myfile" onChange={handleImageChange} accept=".png, .jpg, .jpeg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', position: 'relative' }}>
                    {previewSrc && (
                        <div style={{ position: 'relative' }}>
                            <img
                                width={setCropBox.width}
                                height={setCropBox.height}
                                src={previewSrc}
                                alt="Preview"
                                onMouseDown={(e) => handleMouseDown(e, 'image')}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                style={{ cursor: 'move' }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: cropBox.y,
                                    left: cropBox.x,
                                    width: cropBox.width,
                                    height: cropBox.height,
                                    border: '2px dashed red',
                                }}
                            >
                                {/* Render text overlay */}
                                
                                {textOverlay.length > 0 && (
                                    <>{textOverlay.map((obj,index)=>
                                     <div index={index} style={{ position: 'absolute', top: obj.y, left: obj.x, fontSize: obj.fontSize, color: obj.color }}>
                                        {obj.text}
                                    </div>
                                    )}</>
                                   
                                )}

                                <div
                                    onMouseDown={(e) => handleMouseDown(e, 'top-left')}
                                    style={{ position: 'absolute', top: -5, left: -5, width: '10px', height: '10px', background: 'blue' }}
                                />
                                <div
                                    onMouseDown={(e) => handleMouseDown(e, 'top-right')}
                                    style={{ position: 'absolute', top: -5, left: cropBox.width - 5, width: '10px', height: '10px', background: 'blue' }}
                                />
                                <div
                                    onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
                                    style={{ position: 'absolute', top: cropBox.height - 5, left: -5, width: '10px', height: '10px', background: 'blue' }}
                                />
                                <div
                                    onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
                                    style={{ position: 'absolute', top: cropBox.height - 5, left: cropBox.width - 5, width: '10px', height: '10px', background: 'blue' }}
                                />
                                <button style={{ position: 'absolute', top: cropBox.y - 20, left: cropBox.x + cropBox.width + 10 }} onClick={toggleDragging}>
                                    {draggingEnabled ? 'Enable Drag' :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16">
                                            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <hr />
                <div className='col-12 text-primary'>
                    <button className='btn btn-primary m-1' onClick={() => handleCroped(cropBox)}>Crop Image</button>
                    <button className='btn btn-primary m-1' onClick={handleRotateLeft}>Rotate Left</button>
                    <button className='btn btn-primary m-1' onClick={handleRotateRight}>Rotate Right</button>
                    <button className='btn btn-primary m-1' onClick={handleTextAddition}>Add Text</button>
                    {/* Input fields for editing text overlay */}
                    <input type="text" value={textOverlay.text} onChange={(e) => setTextOverlay({ ...textOverlay, text: e.target.value })} />
                    <input type="number" value={textOverlay.x} onChange={(e) => setTextOverlay({ ...textOverlay, x: parseInt(e.target.value) })} />
                    <input type="number" value={textOverlay.y} onChange={(e) => setTextOverlay({ ...textOverlay, y: parseInt(e.target.value) })} />
                    <input type="number" value={textOverlay.fontSize} onChange={(e) => setTextOverlay({ ...textOverlay, fontSize: parseInt(e.target.value) })} />
                    <input type="color" value={textOverlay.color} onChange={(e) => setTextOverlay({ ...textOverlay, color: e.target.value })} />
                </div>
            </div>
        </div>
    );
}

export default PhotoEdit;





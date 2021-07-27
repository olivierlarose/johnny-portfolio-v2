import React, { useRef, useEffect } from 'react'

const texts = [
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullafacilisi.",
    "Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore"
]

const specialChar = ["sit", "amet", "adipiscing", "ut", "wisi", "enim"]

export default function Description({setBuffer}) {

    const buffer = useRef(null);
    const manageScroll = () => {

    }

    useEffect( () => {
        setBuffer(buffer.current);
        window.addEventListener("scroll", manageScroll)
        return () => {
            window.removeEventListener("scroll", manageScroll);
        }
    }, [])

    const getWords = (text) => {
            const words = text.split(" ");
            return words.map( (word, index) => {
                if(specialChar.indexOf(word) != -1){
                    return <p key={index} className="alt">{word}</p>
                }
                else{
                    return <p key={index}>{word}</p>
                }
            })
    }

    return (
        <div className="description">
            
            <div className="description-container">
                {
                    texts.map( (text, index) => {
                        return <div key={index} className="par">
                            {
                                getWords(text)
                            }
                        </div>
                    })
                }
            </div>
            <div className="buffer">
                <div className="background"></div>
                <div ref={buffer} className="overlay"></div>
            </div>
        </div>
    )
}

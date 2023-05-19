import React, {useContext, useEffect} from 'react';
import { ModalContext } from './SearchMovie';


export default function ModalContent() {
    const { modalContent, closeModal,modalVisible, detail, detailCast} = useContext(ModalContext);


    useEffect(()=> {
        console.log(`キャスト情報があるか：${detailCast}`);  
    }, []);

    return (
        <div className="modal">
            {modalContent && (
                <>
            <div className="modal-content">
                <button className="close-modal" onClick={closeModal}>×</button>
                <div className="modal-left">
                    <img 
                        src={`https://image.tmdb.org/t/p/w200/${modalContent.poster_path}`}
                        alt={modalContent.title}
                    />
                </div>
                <div className='modal-right'>
                    <p>リリース時期：{modalContent.release_date}</p>               
                    <p>評価：{modalContent.vote_average}</p>
                    <p>上映時間：{detail.runtime}</p>
                    <p>キャスト：{detailCast.cast && detailCast.cast.map (cast => cast.name).join(',')}</p>
                    <p>公式サイトURL：{detail.homepage}</p>
                    <p>ジャンル：{detail.genres && detail.genres.map(genre => genre.name).join(',')}</p>
                    
                </div>
            </div>


            </>
            )}
        </div>
    );
}

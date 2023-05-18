import React, {useContext} from 'react';
import { ModalContext } from './SearchMovie';


export default function ModalContent() {
    const { modalContent, closeModal } = useContext(ModalContext);
    return (
        <div className="modal">
            <button className="close-modal" onClick={closeModal}>×</button>
            {modalContent && (
                <>
                <div className="modal-content">
                    <div className="modal-left">
                    <img 
                                src={`https://image.tmdb.org/t/p/w200/${modalContent.poster_path}`}
                                alt={modalContent.title}
                            />
                    </div>
                    <div className='modal-right'>
                    <p>リリース時期：{modalContent.release_date}</p>               
                    <p>評価：{modalContent.vote_average}</p>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}

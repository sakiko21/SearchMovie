import React, {useState, useEffect} from 'react';

export default function ModalContent() {

    const [detail, setDetail] = useState("null");
    const [detailCast, setDetailCast] = useState("null");
    const [modalContent, setModalContent] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);


    function getDetail(id){
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2d251f526c17be62ed7f8c76426218f0&language=ja-JP`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setDetail(response);
        })
        .catch(err => console.error(err));
   }
   function getDetailCast(id){
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2d251f526c17be62ed7f8c76426218f0/credits?language=ja-JP`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setDetailCast(response);
        })
        .catch(err => console.error(err));
   }
   function showModal(content){
    setModalVisible(true);
}
   function closeModal(){
    setModalVisible(false);
   }
    
    useEffect(()=> {
        console.log(`キャスト情報があるか：${detailCast}`);  
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-modal" onClick={closeModal}>×</button>
                <div className="modal-left">
                    <img 
                        src={`https://image.tmdb.org/t/p/w200/${modalContent.poster_path}`}
                        alt={modalContent.title}
                    />
                </div>
                <div className='modal-right'>
                    
                    <p>上映時間：{detail.runtime}分</p>
                    <p>キャスト：{detailCast.cast && detailCast.cast.map (cast => cast.name).join(',')}</p>
                    <p>公式サイトURL：{detail.homepage}</p>
                    <p>ジャンル：{detail.genres && detail.genres.map(genre => genre.name).join(',')}</p>
                    
                </div>
            </div>

        </div>
    );
}

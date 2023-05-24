import './Top.css';
import { Link } from "react-router-dom";
export function Top () {
    return(
        <div>
            <h1>このサイトについて</h1>
            <p>このサイトはReactの勉強用に作成しました</p>
            <div class="button-flex">
                <button>
                    <Link to={"/search"}>
                    映画検索ページ
                    </Link>
                </button>
                <button>
                    <Link to={"/movie/list"}>
                    人気映画ページ
                    </Link>
                </button>
            </div>
        </div>
    )
}
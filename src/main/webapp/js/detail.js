import { productDescription } from "./detail/productDescription.js";
import { comment } from "./review/comment.js";
import { moveTop } from "./common/moveTop.js";

document.addEventListener("DOMContentLoaded", () => {
	productDescription.initProductDescription();	// 상품 상세내용
	comment.initComments();							// 리뷰

	moveTop.initMoveTopButton();							// top 버튼
});
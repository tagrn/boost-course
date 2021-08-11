export const carousel = {
	// 캐러셀 컨테이너 선택
	carouselContainer: document.getElementsByClassName("visual_img")[0],
	
	// 이미지 위치 표시 (0 ~ productImagesLength - 1)
	carouselImageCount: 0,
	
	// 맨 앞 자식 엘리먼트를 맨 뒤로 위치 변경
	moveElementFirstToLast: function() {
		const firstNode = this.carouselContainer.firstElementChild;
		const lastNode = this.carouselContainer.removeChild(firstNode);
		this.carouselContainer.appendChild(lastNode);	
	},

	// 맨 뒤 자식 엘리먼트를 맨 앞로 위치 변경
	moveElementLastToFirst: function() {
		const lastNode = this.carouselContainer.lastElementChild;
		const firstNode = this.carouselContainer.removeChild(lastNode);
		this.carouselContainer.prepend(firstNode);
	},
	
	// 캐러셀(무한 슬라이드) 화면 오른쪽으로 이동
	moveCarouselToRight: function(productImagesLength) {
		this.carouselContainer.style.transition = "0.5s";
		this.carouselContainer.style.transform = "translateX(-200%)";
		
		this.carouselContainer.ontransitionend = () => {
			this.carouselContainer.removeAttribute("style")
			
			// 오른쪽으로 이동 후, 인덱스 1 상승
			this.carouselImageCount++;
			this.updateImageIndex(productImagesLength);

			this.moveElementFirstToLast();
		}
	},
	
	// 캐러셀(무한 슬라이드) 화면 왼쪽으로 이동
	moveCarouselToLeft: function(productImagesLength) {
		this.carouselContainer.style.transition = "0.5s";
		this.carouselContainer.style.transform = "translateX(0%)";
		
		this.carouselContainer.ontransitionend = () => {
			this.carouselContainer.removeAttribute("style")

			// 왼쪽으로 이동 후, 인덱스 1 하락
			this.carouselImageCount--;
			this.updateImageIndex(productImagesLength);

			this.moveElementLastToFirst();
		}
	},
	
	// 캐러셀 이미지 토탈 인덱스 설정
	initImageTotalIndex: function(productImagesLength) {
		const imageTotalIndexContainer = document.getElementsByClassName("num")[1];
		const imageTotalIndexSpan = imageTotalIndexContainer.getElementsByTagName("span")[0];
		imageTotalIndexSpan.innerText = productImagesLength;
	},
	
	// 캐러셀 각 이미지 인덱스 업데이트
	updateImageIndex: function(productImagesLength) {
		const imageIndexContainer = document.getElementsByClassName("num")[0];
		// 카운트 나머지 연산
		this.carouselImageCount = (this.carouselImageCount + productImagesLength) % productImagesLength;
		// 인덱스가 0부터 시작이므로 +1 해줌
		imageIndexContainer.innerText = this.carouselImageCount + 1;
	},
	
	// prev, next 버튼 클릭시, 각 왼쪽, 오른쪽으로 캐러셀 이동 
	initCarouselMovementButton: function(productImagesLength) {
		const prevButtonContainer = document.getElementsByClassName("prev")[0];
		prevButtonContainer.addEventListener("click", () => {
			this.moveCarouselToLeft(productImagesLength);
		})
		
		const nextButtonContainer = document.getElementsByClassName("nxt")[0];
		nextButtonContainer.addEventListener("click", () => {
			this.moveCarouselToRight(productImagesLength);
		})
	},
	
	// detail 페이지 상품 캐러셀
	initProductCarousel: function(productImagesLength) {
		this.moveElementLastToFirst();
		this.initCarouselMovementButton(productImagesLength);
		this.initImageTotalIndex(productImagesLength);
	}
}
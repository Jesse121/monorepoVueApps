/**
 * 文案较多 超出边界时设置...
 * @param el
 */
export function ellipsis(el: HTMLElement) {
	// 设置超出隐藏
	el.style.overflow = "hidden";
	el.style.textOverflow = "ellipsis";
	el.style.whiteSpace = "nowrap";
	// 鼠标移入提示title
	if (el.clientWidth < el.scrollWidth) {
		el.title = el.innerHTML;
	}
}

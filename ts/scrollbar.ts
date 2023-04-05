import * as $ from 'jquery';
import { stopDefault } from './stopdefault';

// SCROLL BAR //
// TODO:
//	capture keystrokes: pgup, pgdn, home, end, etc...
//

export class scrollbar {

	private container;
	private contentHeight: number = 0;
	private trackHeight: number = 0;
	private handleHeight: number = 0;
	private listUnit: number = 0;

	private grabbed: boolean = false;
	private tid: number = 0;

	public constructor(container: JQuery<HTMLElement>) {
		this.container = container;
		let that = this;

		window.addEventListener('wheel', function (e: WheelEvent) {
			var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
			that.container.scrollTop(that.container.scrollTop() + (wheelData > 0 ? -24 : 24) * (Math.abs(wheelData) + 2));
			if ($('#content').height() != that.contentHeight) that.layout();

			return stopDefault(e);
		}, false);

		this.container.scroll((e) => {
			$('#scrollbar-handle').css('top', Math.floor((that.trackHeight) * 24 * that.container.scrollTop() / that.contentHeight / 24) * 24);
		});

		$('#scrollbar-handle-track').mousedown((e): boolean => {
			that.grabbed = true;
			that.move(e);
			return stopDefault(e);
		});
		$('#scrollbar-handle').mousedown((e) => {
			that.grabbed = true;
			if ($('#content').height() != that.contentHeight) that.layout();
			return stopDefault(e);
		});
		$('#scrollbar-up').mousedown((e) => {
			that.tid = setInterval((n: number = 24) => {
				that.container.scrollTop(that.container.scrollTop() - n);
			}, 100);
			return stopDefault(e);
		});
		$('#scrollbar-down').mousedown((e) => {
			that.tid = setInterval((n: number = 24) => {
				that.container.scrollTop(that.container.scrollTop() + n)
			}, 100);
			return stopDefault(e);
		});


		$('body').mouseup((e) => {
			that.grabbed = false;
			clearInterval(that.tid);
		}).mousemove((e) => {
			if (that.grabbed) {
				that.move(e);
				return stopDefault(e);
			}
		});

		this.layout();
	}

	private layout () {
		this.contentHeight = $('#content').height() + 16;
		this.trackHeight = Math.round(($('#scrollbar-handle-track').height()) / 24);
		this.listUnit = this.trackHeight * 24 / (this.contentHeight / 24);
		this.handleHeight = minmax(Math.floor((this.container.height() / this.contentHeight) / ((this.contentHeight / this.trackHeight) / this.contentHeight)), 1, this.trackHeight);
		$('#scrollbar-handle').height(this.handleHeight*24);

		$('#scrollbar-handle-track').children().remove('.char');
		for (let i:number = 0; i < ($('#scrollbar-handle-track').height()/24);i++)
			$('#scrollbar-handle-track').append('<span class="char">&#9617;</span>');
	}

	private move(e) {
		let analogValue = minmax(e.pageY - this.container.offset().top - (this.handleHeight * 24 / 2), 0, (this.trackHeight - this.handleHeight) * 24);

		$('#scrollbar-handle').css('top', minmax(Math.round(analogValue/24)*24, 0, (this.trackHeight)*24));
		this.container.scrollTop(Math.round(analogValue/this.listUnit)*24);
	}
}

function minmax(num, min, max) {
	if (num > max) return max;
	if (num < min) return min;
	return num;
}

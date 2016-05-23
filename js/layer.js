function layerOpen(n) {
	if (!n || !n.content) {
		return
	}
	var k = document.createElement("div");
	k.setAttribute("id", "layer_root");
	k.setAttribute("class", "layer_root opacityIn");
	var j;
	var l = 'class="layer_title"';
	if (n.style && n.style.title) {
		l += " style='" + n.style.title + "'"
	}
	if (n.title == null) {
		j = "<div " + l + ">温馨提示:</div>"
	} else {
		if (n.title == "") {
			j = ""
		} else {
			j = "<div " + l + ">" + n.title + "</div>"
		}
	}
	var d = "";
	var g = 'id="layer_btns" class="layer_btns"';
	if (n.style && n.style.btn != null) {
		g += " style='" + n.style.btn + "'"
	}
	if (n.btn) {
		var m = n.btn.length;
		if (m == 1) {
			d = "<table " + g + '><tr><td id="0" class="layer_btn_single">' + n.btn[0] + "</td></tr></table>"
		} else {
			if (m == 2) {
				d = "<table " + g + '><tr><td id="0" class="layer_btn_left">' + n.btn[0] + '</td><td id="1" class="layer_btn_right">' + n.btn[1] + "</td></tr></table>"
			} else {
				if (m > 2) {
					for (var e = 0; e < m; e++) {
						if (e == 0) {
							d += '<td id="0" class="layer_btn_left">' + n.btn[e] + "</td>"
						} else {
							if (e < m - 1) {
								d += '<td id="' + e + '" class="layer_btn_middle">' + n.btn[e] + "</td>"
							} else {
								d += '<td id="' + e + '" class="layer_btn_right">' + n.btn[e] + "</td>"
							}
						}
					}
					d = "<table " + g + "><tr>" + d + "</tr></table>"
				}
			}
		}
	}
	var b = 'class="layer_content"';
	if (n.style && n.style.content != null) {
		b = " style='" + n.style.content + "'"
	}
	var f = '<div class="layer_main scaleIn opacityIn" id="layer_main">' + j + "<div " + b + ">" + n.content + "</div>" + d + "</div>";
	k.innerHTML = f;
	document.body.appendChild(k);
	if (d) {
		var a = document.getElementById("layer_btns");
		if (a) {
			a.addEventListener("tap", function(q) {
				var o = q.target.getAttribute("id");
				if (o) {
					var i = Number(o);
					if (n.event && n.event.length > i) {
						var p = n.event[i];
						if (p && p()) {
							return
						}
					}
					layerClose(n.closeEvent)
				}
			})
		}
	}
	var c = document.getElementById("layer_main");
	c.addEventListener("tap", function(i) {
		i.stopPropagation()
	});
	if (n.shadeClose) {
		k.addEventListener("tap", function() {
			layerClose(n.closeEvent)
		})
	}
	if (n.backClose != false && mui.os.android) {
		var h = mui.back;
		mui.back = function() {
			layerClose(n.closeEvent)
		};
		androidBackEvent = function() {
			mui.back = h
		}
	}
}
var androidBackEvent;

function layerClose(c) {
	var b = document.getElementById("layer_root");
	if (b) {
		var a = document.getElementById("layer_main");
		a.classList.add("scaleOut");
		a.classList.add("opacityOut");
		b.classList.add("opacityOut");
		setTimeout(function() {
			document.body.removeChild(b)
		}, 300)
	}
	c && c();
	androidBackEvent && androidBackEvent()
};
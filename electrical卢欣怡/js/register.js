const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {
	if(req.url != "/favicon.ico") {
		const {
			query,
			pathname
		} = url.parse(req.url, true);
		if(pathname == "/register") {

		} else if(pathname == "/") {
			fs.readFile(".././index.html", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(/^\/img\/.+$/.test(pathname)) {

			var image = pathname.slice(1);

			res.writeHead(200, {
				"content-type": "img/*;charset=utf8"
			});
			fs.readFile("../" + image, (err, data) => {
				res.end(data)
			})

		} else if(pathname == "/css/electrical.css") {
			fs.readFile("../css/electrical.css", (err, data) => {

				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/pool.js") {
			fs.readFile("../js/pool.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/cookie.js") {
			fs.readFile("../js/cookie.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/electrical.js") {
			fs.readFile("../js/electrical.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/html/register.html") {
			fs.readFile("../html/register.html", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/css/register.css") {
			fs.readFile("../css/register.css", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/css/electrical.css") {
			fs.readFile("../css/electrical.css", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/html/login.html") {
			fs.readFile("../html/login.html", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/css/login.css") {
			fs.readFile("../css/login.css", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/css/electrical.css") {
			fs.readFile("../css/electrical.css", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/html/login.html/login") {

			fs.readFile(".././register.json", (err, data) => {

				var str = data + "";
				if(str) {
					let data = JSON.parse(str);
					let bStop = true;
					for(let key in data) {
						if(data[key].username == query.username) {
							if(data[key].password == query.password) {
								let obj = {
									info: "用户名重复",
									status: 1
								};
								res.writeHead(200, {
									"content-type": "application/json;charset=utf8"
								});
								res.end(JSON.stringify(obj))
							} else {
								let obj = {
									info: "密码错误，请重新输入",
									status: 2
								};
								res.writeHead(200, {
									"content-type": "application/json;charset=utf8"
								});
								res.end(JSON.stringify(obj))
							}

							bStop = false;
							break;
						}
					}
					if(bStop) {
						let obj = {
							info: "登录失败，请注册",
							status: 0
						};
						res.writeHead(200, {
							"content-type": "application/json;charset=utf8"
						});
						res.end(JSON.stringify(obj))
					}
				} else {
					let obj = {
						info: "登录失败，请注册",
						status: 0
					};
					res.writeHead(200, {
						"content-type": "application/json;charset=utf8"
					});
					res.end(JSON.stringify(obj))
				}
			})
		} else if(pathname == "/html/register.html/register") {

			fs.readFile(".././register.json", (err, data) => {

				var str = data + "";
				if(str) {

					let data = JSON.parse(str);
					let bStop = true;
					for(let key in data) {
						if(data[key].username == query.username) {
							//开始----向客户端返回信息
							let obj = {
								info: "用户名重复",
								status: 0
							}
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							res.end(JSON.stringify(obj));
							bStop = false;
							break;
						}
					}
					if(bStop) {
						data.push(query);
						res.writeHead(200, {
							"content-type": "application/json;charset=utf8"
						});
						let obj = {
							info: "注册成功",
							status: 1
						};
						res.end(JSON.stringify(obj));

						fs.writeFile("./register.json", JSON.stringify(data), (err) => {})
					}
				} else {

					var arr = [];
					arr.push(query);

					fs.writeFile(".././register.json", JSON.stringify(arr), (err) => {});

					res.writeHead(200, {
						"content-type": "application/json;charset=utf8"
					});
					let obj = {
						info: "注册成功",
						status: 1
					};
					res.end(JSON.stringify(obj));
				}
			})

		}

		if(pathname == "/login") {
			fs.readFile(".././register.json", (err, data) => {
				var str = data + "";
				if(str) {
					let data = JSON.parse(str);
					let bStop = true;
					for(let key in data) {
						if(data[key].username == query.username) {
							if(data[key].password == query.password) {
								let obj = {
									info: "用户名重复",
									status: 1
								};
								res.writeHead(200, {
									"content-type": "application/json;charset=utf8"
								});
								res.end(JSON.stringify(obj))
							} else {
								let obj = {
									info: "密码错误，请重新输入",
									status: 2
								};
								res.writeHead(200, {
									"content-type": "application/json;charset=utf8"
								});
								res.end(JSON.stringify(obj))
							}

							bStop = false;
							break;
						}
					}
					if(bStop) {
						let obj = {
							info: "登录失败，请注册",
							status: 0
						};
						res.writeHead(200, {
							"content-type": "application/json;charset=utf8"
						});
						res.end(JSON.stringify(obj))
					}
				} else {
					let obj = {
						info: "登录失败，请注册",
						status: 0
					};
					res.writeHead(200, {
						"content-type": "application/json;charset=utf8"
					});
					res.end(JSON.stringify(obj))
				}
			})

		} else if(pathname == "/") {
			fs.readFile(".././index.html", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(/^\/img\/.+$/.test(pathname)) {

			var image = pathname.slice(1);

			res.writeHead(200, {
				"content-type": "img/*;charset=utf8"
			});
			fs.readFile("../" + image, (err, data) => {
				res.end(data)
			})

		} else if(pathname == "/css/electrical.css") {
			fs.readFile("../css/electrical.css", (err, data) => {

				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/pool.js") {
			fs.readFile("../js/pool.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/cookie.js") {
			fs.readFile("../js/cookie.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/electrical.js") {
			fs.readFile("../js/electrical.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/electrical.js") {
			fs.readFile("../js/electrical.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		}

		if(pathname == "/html/detail.html") {

			fs.readFile("../html/detail.html", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/css/detail.css") {
			fs.readFile("../css/detail.css", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/html/detail.html/addCart") {
			fs.readFile(".././product.json", (err, data) => {

				var str = data + "";
				var data = JSON.parse(str);
				if(data.length > 0) {
					var bStop = true;
					for(var key in data) {
				
						if(data[key].id == query.id) {
							
							var value = Number(data[key].number)+Number(query.number);
//						
							data[key].number = value;
							fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							let obj = {
								info: "加入购物车成功",
								status: 1
							};
							res.end(JSON.stringify(obj));
							
							bStop = false;
							break;
						}
//
					}

					if(bStop) {
						data.push(query);
						fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
						res.writeHead(200, {
							"content-type": "application/json;charset=utf8"
						});

					}
				} else {
					var arr = [];
					arr.push(query);

					fs.writeFile(".././product.json", JSON.stringify(arr), (err) => {});
					res.writeHead(200, {
						"content-type": "application/json;charset=utf8"
					});
					let obj = {
						info: "加入购物车成功",
						status: 1
					};
					res.end(JSON.stringify(obj));
				}

			})

		}else if(pathname == "/html/cart.html") {
			fs.readFile("../html/cart.html", (err, data) => {

				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/css/cart.css") {
			fs.readFile("../css/cart.css", (err, data) => {

				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/cart.js") {
			fs.readFile("../js/cart.js", (err, data) => {

				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/html/cart.html/addCart") {
		
			fs.readFile(".././product.json", (err, data) => {
					var str = data + "";
				var data = JSON.parse(str);
				for(var key in data){
					if(data[key].id == query.id){
						data[key].number = query.number;
						fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							let obj = {
								info: "加入购物车成功",
								status: 1
							};
							res.end(JSON.stringify(obj));

							bStop = false;
							break;
					}
				}
//				res.writeHead(200, {
//					"content-type": "application/x-javascript;charset=utf8"
//				});
//				res.end(data)
			})
		}  else if(pathname == "/html/cart.html/removeCart") {
			fs.readFile(".././product.json", (err, data) => {
					var str = data + "";
				var data = JSON.parse(str);
				for(var key in data){
				
					if(data[key].id == query.id){
						data.splice(key,1)
						
						fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							let obj = {
								info: "删除成功",
								status: 1
							};
							res.end(JSON.stringify(obj));
							
					}
				}

			})
		}  else if(pathname == "/html/cart.html/removeAllCart") {
			fs.readFile(".././product.json", (err, data) => {
					var str = data + "";
				var data = JSON.parse(str);
				data = [];
					fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							let obj = {
								info: "删除成功",
								status: 1
							};
							res.end(JSON.stringify(obj));
				
			})
		} else if(pathname == "/html/cart.html/removeSingleCart") {
			fs.readFile(".././product.json", (err, data) => {
					var str = data + "";
				var data = JSON.parse(str);
				var queryValue = (query.arr + "").split(",");
				
				
				
				for(var i = 0;i<queryValue.length;i++){
					for(var j =0;j<data.length;j++){
						if(Number(data[j].id) == Number(queryValue[i])){
							data.splice(j,1);
						}
					}
				}

					fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							let obj = {
								info: "删除成功",
								status: 1
							};
							res.end(JSON.stringify(obj));
				
			})
		} 
		
		
		
		
		
		

		if(pathname == "/addCart") {
			fs.readFile(".././product.json", (err, data) => {

				var str = data + "";
				var data = JSON.parse(str);

				if(data.length > 0) {
					var bStop = true;
					for(var key in data) {
						if(data[key].id == query.id) {

							data[key].number++;
							fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
							res.writeHead(200, {
								"content-type": "application/json;charset=utf8"
							});
							let obj = {
								info: "加入购物车成功",
								status: 1
							};
							res.end(JSON.stringify(obj));

							bStop = false;
							break;
						}

					}

					if(bStop) {
						data.push(query);
						fs.writeFile(".././product.json", JSON.stringify(data), (err) => {});
						res.writeHead(200, {
							"content-type": "application/json;charset=utf8"
						});

					}
				} else {
					var arr = [];
					arr.push(query);

					fs.writeFile(".././product.json", JSON.stringify(arr), (err) => {});
					res.writeHead(200, {
						"content-type": "application/json;charset=utf8"
					});
					let obj = {
						info: "加入购物车成功",
						status: 1
					};
					res.end(JSON.stringify(obj));
				}

				//						if(str){
				//							let data = JSON.parse(str);
				//							let bStop = true;
				//							for(let key in data){
				//								if(data[key].username == query.username){
				//										if(data[key].password == query.password){
				//											let obj = {info:"用户名重复",status:1};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//										}else{
				//											let obj = {info:"密码错误，请重新输入",status:2};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//										}
				//									
				//									bStop = false;
				//									break;
				//								}
				//							}
				//							if(bStop){
				//								let obj = {info:"登录失败，请注册",status:0};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//							}
				//						if(str){
				//							let data = JSON.parse(str);
				//							let bStop = true;
				//							for(let key in data){
				//								if(data[key].username == query.username){
				//										if(data[key].password == query.password){
				//											let obj = {info:"用户名重复",status:1};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//										}else{
				//											let obj = {info:"密码错误，请重新输入",status:2};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//										}
				//									
				//									bStop = false;
				//									break;
				//								}
				//							}
				//							if(bStop){
				//								let obj = {info:"登录失败，请注册",status:0};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//							}
				//					}else{
				//								let obj = {info:"登录失败，请注册",status:0};
				//									res.writeHead(200,{"content-type":"application/json;charset=utf8"});
				//									res.end(JSON.stringify(obj))
				//						}
			})

		} else if(pathname == "/") {
			fs.readFile(".././index.html", (err, data) => {
				res.writeHead(200, {
					"content-type": "text/html;charset=utf8"
				});
				res.end(data)
			})
		} else if(/^\/img\/.+$/.test(pathname)) {

			var image = pathname.slice(1);

			res.writeHead(200, {
				"content-type": "img/*;charset=utf8"
			});
			fs.readFile("../" + image, (err, data) => {
				res.end(data)
			})

		} else if(pathname == "/css/electrical.css") {
			fs.readFile("../css/electrical.css", (err, data) => {

				res.writeHead(200, {
					"content-type": "text/css;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/pool.js") {
			fs.readFile("../js/pool.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/cookie.js") {
			fs.readFile("../js/cookie.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		} else if(pathname == "/js/electrical.js") {
			fs.readFile("../js/electrical.js", (err, data) => {
				res.writeHead(200, {
					"content-type": "application/x-javascript;charset=utf8"
				});
				res.end(data)
			})
		}

	}

}).listen(9000)
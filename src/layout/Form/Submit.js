import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {event, strMapToObj} from '../Base/Js/utils';
import {Button, ButtonArea} from '../Button/index';
// 不限制监听数量
event.setMaxListeners(0);
// 用于统计当前的接收到的验证input数量
let n = 0;
class Submit extends Component {
	
	static propTypes = {

	};

	static defaultProps = {

	};

	constructor(props) {
		super(props);
		this.state = {
			validMap: new Set(),
			enabledMap: new Map(),
			flag: true
		};
		this.validsize = 0;
	}

	componentDidMount() {
		event.addListener('validate', this.handleValidate.bind(this));
		event.addListener('btnEnabeld', this.handleEnabeld.bind(this));
	}

	componentWillUnmount() {
		event.removeAllListeners();
		this.setState({validMap: new Set()});
		n = 0;
	}
	
	handleValidate(ops) {
		if (!this.button || !ops) return; // bugfix
		n++;
		let {validMap} = this.state;
		validMap = validMap.add(ops);
		this.setState({validMap});
		// 当接受完毕解析传入map
		if (this.validsize === n) this.parseValidMap(this.state.validMap);
	}

	handleEnabeld(key, value) {
		if (!this.button) return; // bugfix
		let {enabledMap} = this.state;
		enabledMap = enabledMap.set(key, value);
		this.setState({enabledMap});
		// 审查必须填写项全部填写
		this.parseEnabeldMap(this.state.enabledMap);
	}
	// 获取form中验证表单数量
	handleValidSize(size) {
		this.validsize = size;
	}

	handleValidRemove(target) {
		n--;
		
	}

	handleClick(e) {
		// const requiredMap = [];
		// Array.from(this.state.validMap).map((item) => {
		// 	const {target, validProps, validation} = item,
		// 		  {value} = target,
		// 		  {validType, hint, rules, required} = validProps,
		// 		  {validHook, showHint} = validation;
		// 	if (required && value === "") {
		// 		requiredMap.push(required); 
		// 		return false;
		// 	}
		// })
		// requiredMap.length > 0
 		if (this.props.onClick) this.props.onClick(e); 
	}
	
	// 处理validMap, 分离出 requiredMap [], validMap []
	parseValidMap(data) {
		if (data.size <= 0) return;
		for (let item of data.keys()) {
			const {target, validProps, validation} = item,
				  {value} = target,
			      {validType, hint, rules, required} = validProps,
			      {validHook, showHint} = validation;
			this.handleEnabeld(target, value);
		}	
	}
	// 处理按钮显示状态
	parseEnabeldMap() {
		const {enabledMap} = this.state;
		if (enabledMap.size <= 0) return;
		let flag = true;
		for (let value of enabledMap.values()) {
			if (value === "") {
				flag = false;
				break;
			} 
			flag = true;
		}

		this.setState({flag});
	}

	render() {
		// 查收form中input数量
		event.addListener('validsize', this.handleValidSize.bind(this));
		event.addListener('validremove', this.handleValidRemove.bind(this));

		const {className, children, onClick, ...other} = this.props;
		const cls = classNames('ui-form', className);

		return <Button disabled={!this.state.flag} size="large" type="orange-white" onClick={this.handleClick.bind(this)} ref={ref => this.button = ref} {...other}> {children} </Button>
	}
}

export default Submit;
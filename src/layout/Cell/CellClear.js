import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './cell.scss';

// clear for cell 清空信息
class CellClear extends Component {

	static contextTypes = {
		showCellClear: PropTypes.bool,
		handleCellClear: PropTypes.func
	};

	handleClick(e) {
		this.context.handleCellClear(true);
		if (this.props.onClick) this.props.onClick(e);
	}

	render() {
		const {children, className, onClick, ...other} = this.props;
		const cls = classNames({
			'ui-cell-clear': true,
			'ui-cell-clear-show': this.context.showCellClear
		}, className);

		return (
			<div className={cls} {...other} onClick={this.handleClick.bind(this)}>
				<span className="ui-cell-clear-icon">{children}</span>
			</div>
		);
	}
};

export default CellClear;
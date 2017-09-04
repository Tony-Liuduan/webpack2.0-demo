import React from 'react';
import { DatePicker, message, Button} from 'antd';

class AndtHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          date: '',
        };
    }

    handleChange(date) {
        message.info('您选择的日期是: ' + date.toString());
        this.setState({ date });
    }
  
    render() {
        return (
            <div style={{ width: 400, margin: '100px auto' }}>
                <DatePicker onChange={value => this.handleChange(value)} />
                <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
                <div>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </div>
            </div>
        );
    }
}

export default AndtHome;
import React, {Component} from 'react';
import InputSelect from '../../../components/buy/InputSelect';
import {ERROR_RELATION_REQUIRED} from '../../../config/ErrorMessage';
import ModalRelationType from './ModalRelationType';
import {Color} from '../../../config/System';

class RelationSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: null,
            name: props.value,
            errorRelation: '',
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {value} = this.props;
        const {name} = this.state;
        if(value !== prevProps.value) {
            this.setState({name: value});
        }
        if(name !== prevState.name) {
            this.checkValidate();
        }
    }

    checkValidate = () => {
        if (this.state.name == '') {
            this.setState({
                errorRelation: ERROR_RELATION_REQUIRED,
            });
            return false;
        } else {
            this.setState({errorRelation: ''}); // không có lỗi validate
            return true;
        }
    };

    setType = (data) => {
        const {setRelation} = this.props;
        this.setState({name: data.name});
        setRelation(data.name);
    };

    render() {
        const {selectedBuyer} = this.props;
        const {name, errorRelation, modalType} = this.state;
        return (
            <>
                <InputSelect
                    value={name}
                    openModal={() => this.setState({modalType: true})}
                    error={errorRelation}
                />
                <ModalRelationType
                    open={modalType}
                    selectedBuyer={selectedBuyer}
                    onClosed={() => {
                        this.setState({modalType: null});
                        this.checkValidate();
                    }}
                    setType={data => this.setType(data)}
                    onOpened={() => this.setState({modalType: true})}
                />
            </>
        );
    }
}

export default RelationSelect;

import React from 'react';
import ContentEditable from 'react-contenteditable';
import EditableText from './EditableText';

class NameField extends EditableText {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {
        html: props.name,
        name: props.name
    };
  };

  handleChange = evt => {
    var name = evt.target.value.replace(`&nbsp;`, ` `);
    this.setState({
        html: name,
        name: name
    });
    this.props.onChange(name);
  };

  componentDidUpdate(prevProps) {
    if(this.props.name !== prevProps.name)
    {
      this.setState({
        html: this.props.name,
        name: this.props.name.replace(`&nbsp;`, ` `)
      });
    }
  } 

  render = () => {
    return (
      <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            onChange={this.handleChange}
            tagName='h2'
          />
    );
  };
};

export default NameField;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

class TwoWayBinding extends Component {
    constructor( props ) {
    super( props );

    this.state = {
        data: '<p>React is really <em>nice</em>!</p>'
    };

    this.handleChange = this.handleChange.bind( this );
    this.onEditorChange = this.onEditorChange.bind( this );
    }

    onEditorChange( evt ) {
    this.setState( {
        data: evt.editor.getData()
    } );
    }

    handleChange( changeEvent ) {
    this.setState( {
        data: changeEvent.target.value
    } );
    }

    render() {
      return (
        <div>
            <CKEditor
              type="classic"
              data={this.state.data}
              onChange={this.onEditorChange} />
              <label>
                  Change value:
                  <textarea defaultValue={this.state.data} onChange={this.handleChange} />
              </label>
              <EditorPreview data={this.state.data} />
        </div>
    );
  }
}

class EditorPreview extends Component {
  render() {
    return (
      <div className="editor-preview">
        <h2>Rendered content</h2>
        <div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
      </div>
    );
  }
}

EditorPreview.defaultProps = {
    data: ''
};

EditorPreview.propTypes = {
    data: PropTypes.string
};

export default TwoWayBinding;

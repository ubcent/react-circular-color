import React from 'react';
import ReactDOM from 'react-dom';
import CircularColor from '../src';
import CustomizedHandle from './Customized/CustomizedHandle';
import CustomizedRect from './Customized/CustomizedRect';

console.log(`react-circular-color v${COMPONENT_VERSION}`);

const githubURL = 'https://github.com/ubcent/react-circular-color';

const Config = ({ name, example, description, children }) => (
  <div className="row mb-3">
    <div className="col-xs-12 col-md-6 offset-md-3">
      <p><code>{name}</code><small className="text-muted ml-1">{example ? `e.g. ${example}` : null}</small></p>
      <p>{description}</p>
      <div className="row">
        <div className="col-xs-4 offset-xs-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Example = ({ description, children }) => (
  <div className="col-xs-12 col-sm-6">
    <div className="row mb-1">
      <div className="col-xs-4 offset-xs-4">
        {children}
      </div>
    </div>
    <p>{description}</p>
  </div>
);

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: null
    }
  }

  onChangeColor = (color) => {
    this.setState({color});
  }

  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-xs-12">
            <div className="text-xs-center">
              <h1 className="mb-2">{COMPONENT_NAME}</h1>
              <p>{COMPONENT_DESCRIPTION}</p>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-xs-6 offset-xs-3 col-md-2 offset-md-5">
            <CircularColor
              size={200}
            />
          </div>
        </div>

        <div className="text-xs-center my-3">
          <p>Install with npm:</p>
          <p className="mb-3"><code>npm install {COMPONENT_NAME}</code></p>
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>

        <hr />
        <div className="row mt-3">
          <Example
            description="Configure catching of a changing color"
          >
            <CircularColor
              size={200}
              onChange={this.onChangeColor}
            />
            {this.state.color ? <h4 style={{ color: this.state.color }}>Color: {this.state.color}</h4> : ''}
          </Example>

          <Example
            description="Configure central rectangle visibility and number of the sectors."
          >
            <CircularColor
              centerRect
              numberOfSectors={1000}
            />
          </Example>
        </div>

        <hr />
        <h2 className="text-xs-center my-3">Props</h2>

        <Config
          name="size"
          example="200"
          description="Size of the wheel in pixels"
        />
        <Config
          name="className"
          example="wheel"
          description="Classes to apply to the svg element"
        />
        <Config
          name="centerRect"
          example="false"
          description="Whether to display central rectangle with picked color."
        />
        <Config
          name="onChange"
          description="Fired when the color is changing."
        />
        <hr />

        <h2 className="text-xs-center my-3">Examples Custimzed Elements</h2>
        <div class="row mt-3">
        <Example
          description="Customizing Handle"
          >
        <CustomizedHandle />
        </Example>

        <Example
          description="Customizing Rect"
          >
        <CustomizedRect />

        </Example>
        </div>





        <hr />
        <div className="text-xs-center my-3">
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));

import React from 'react'
import Typography from '@material-ui/core/Typography'


class DomainInstructions extends React.Component {
  render() {
    return (
      <Typography component="div">
        <h3>Domains</h3>
        <p>Refers to the type of knowledge, primarily categorized as social, physical and time domain.
          The three types are explained as follows:</p>
        <ul>
          <div>
            <li><u>Social</u>: It focuses on people and social behavior, particularly attributes like personality,
              emotions and actions.</li>
            <div style={{paddingLeft: "2em"}}>
              <p><i>e.g.</i> Sam being an orderly person, cannot withstand the litter in his kitchen. [True]</p>
            </div>
          </div>
          <div>
            <li><u>Physical</u>: Key aspects include the knowledge of objects, location, motion, etc.</li>
            <div style={{paddingLeft: "2em"}}>
              <p><i>e.g.</i> If we spill over milk on the floor,
                it’s better to clean it with a mop instead of a broom. [True]</p>
            </div>
          </div>
          <div>
            <li><u>Time</u>: Knowledge regarding scheduling activities and their durations.</li>
            <div style={{paddingLeft: "2em"}}>
              <p><i>e.g.</i> Given the hour long queue at the entrance, we can't shop within minutes. [True]</p>
            </div>
          </div>
        </ul>
      </Typography>
    )
  }
}


export default DomainInstructions

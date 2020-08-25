import React from 'react'
import Typography from '@material-ui/core/Typography'


class ScenarioInstructions extends React.Component {
  render() {
    return (
      <Typography component="div">
        <h3>Scenarios</h3>
        <p>Refers to the type of reasoning that sentence requires in order to assess its correctness (True/False).
          There are three types of scenarios as follows:</p>
        <ul>
          <div>
            <li><u>Cause & Effect</u>: It answers the “Why” question or predicts what is likely to happen next (effect),
              given an event that has occurred (cause).</li>
            <div>
              <p><i>e.g.</i> Given the hour long queue at the entrance (C), we can't shop within minutes (E). [True]</p>
            </div>
          </div>

          <div>
            <li><u>Comparison</u>: It aims to compare two plausible reasons or concepts, for a given daily event.</li>
            <div>
              <p><i>e.g.</i> If we spill over milk on the floor, it’s better to clean it with a mop instead of a broom. [True]</p>
            </div>
          </div>

          <div>
            <li><u>Numeracy</u>: It focuses on simple arithmetic skills (add, multiply, etc.)
              and concepts such as rate, percentage, probability, etc.</li>
            <div>
              <p><i>e.g.</i> Given his $1000 monthly income and no money in savings, a rent of $1500 raises the risk of facing an eviction. [True]</p>
            </div>
          </div>
        </ul>
      </Typography>
    )
  }
}


export default ScenarioInstructions

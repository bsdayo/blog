use crossterm::event::{Event, EventStream, KeyCode};
use ratatui::Frame;
use ratatui::layout::{Constraint, Direction, Layout};
use ratatui::style::Stylize;
use ratatui::text::Text;
use tokio::sync::mpsc::{UnboundedSender, unbounded_channel};
use tokio_stream::StreamExt;

enum Message {
    Exit,
}

#[derive(Debug)]
struct App {
    sender: UnboundedSender<Message>,
    exited: bool,
}

impl App {
    pub fn new(sender: UnboundedSender<Message>) -> Self {
        Self {
            sender,
            exited: false,
        }
    }
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let mut terminal = ratatui::init();

    let (sender, mut receiver) = unbounded_channel::<Message>();
    let mut app = App::new(sender);

    spawn_event_listener(app.sender.clone());

    while !app.exited {
        terminal.draw(|frame| render(&app, frame))?;
        if let Some(message) = receiver.recv().await {
            update(&mut app, message);
        }
    }

    ratatui::restore();
    Ok(())
}

fn render(_app: &App, frame: &mut Frame) {
    let layout = Layout::default()
        .direction(Direction::Vertical)
        .constraints(vec![Constraint::Fill(1), Constraint::Length(1)])
        .split(frame.area());

    let page_area = layout[0];
    let footer_area = layout[1];

    let block = ratatui::widgets::Block::default()
        .title("Ratatui + Crossterm Event Handling")
        .borders(ratatui::widgets::Borders::ALL);

    frame.render_widget(block, page_area);

    let footer = Text::from("Footer").black().on_yellow();
    frame.render_widget(footer, footer_area);
}

fn update(app: &mut App, message: Message) {
    match message {
        Message::Exit => {
            app.exited = true;
        }
    }
}

fn spawn_event_listener(sender: UnboundedSender<Message>) {
    tokio::spawn(async move {
        let mut event_stream = EventStream::new();
        while let Some(Ok(event)) = event_stream.next().await {
            let msg = match event {
                Event::Key(key) => match key.code {
                    KeyCode::Esc => Some(Message::Exit),
                    _ => None,
                },
                _ => None,
            };
            if let Some(msg) = msg {
                sender.send(msg).unwrap();
            }
        }
    });
}
